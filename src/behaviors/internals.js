import { LogLevel } from "@pnp/logging";
import { HttpRequestError } from "@pnp/queryable";

/**
 * @param {number} httpCode
 * @returns {boolean}
 */
function httpCanRety(httpCode) {
  switch (httpCode) {
    case 408:
    case 429:
    case 503:
    case 504:
      return true;
    default:
      return false;
  }
}

export const ABORT_SUPPORT = Symbol("PRH_ABORT_SUPPORTED");

/**
 * @typedef FetchInit
 * @prop {RequestInit} [request] - Fetch request.
 * @prop {number} [retry] - Maximum retry count for failing requests. Default is 3.
 * @prop {number} [waitTime] - Wait time in ms for next retry call. Default is 200ms.
 */

/**
 * Calls native fetch with retry mechanism.
 * Remarks; Fetch internal errors are not recoverable without changing the request properties.
 * Any retry configuration is ignored when fetch throws expections.
 * See fetch errors {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions}
 *
 * @param {RequestInfo} input
 * @param {FetchInit} [init]
 * @returns {Promise<Response>}
 */
export async function browserFetchRetry(input, init) {
  const retry = (init?.retry ?? 3) - 1; // reducing retry count by 1.
  let wait = init?.waitTime ?? 200;

  const response = await fetch(input, init?.request);

  // Response is not ok
  if (!response.ok) {
    // network or throttle error, we can still retry
    if (httpCanRety(response.status) && retry > 0) {
      let retryHeader = response.headers.get("Retry-After");
      if (retryHeader) {
        wait = parseInt(retryHeader, 10) * 1000;
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          browserFetchRetry(input, {
            request: init?.request,
            retry: retry,
            waitTime: init?.waitTime,
          })
            .then(resolve)
            .catch(reject);
        }, wait);
      });
    } else {
      // Retry count exceeded the limit, bad request, forbidden, server 500 etc.
      throw new HttpRequestError(
        `${input.toString()} failed with ${response.status}:${response.statusText}`,
        response,
      );
    }
  } else {
    return response;
  }
}

/**
 * Basic version of AbortController but allows reset.
 */
export class ManagedAbort {
  /** @type{AbortController} **/
  #abortController;

  constructor() {
    this.#abortController = new AbortController();
  }

  /**
   * @returns {Readonly<AbortSignal>}
   **/
  get signal() {
    return this.#abortController?.signal;
  }

  abort() {
    this.#abortController.abort();
  }

  reset() {
    this.#abortController = new AbortController();
  }
}

export class AbortError extends Error {
  constructor() {
    super("Fetch aborted");
    this.name = "AbortError";
  }
}

/**
 * Aborts fetch request and pnpjs timeline at any point.
 * @param {ManagedAbort} abortController
 * @returns {(arg0:import('@pnp/queryable/queryable').Queryable<any>) => import('@pnp/queryable/queryable').Queryable<any>}
 */
export function InjectAbort(abortController) {
  return (instance) => {
    let isAbortSupported = true;

    for (const sendObserver of instance.on.send.toArray()) {
      // Some fetch implementations may cause an infinite loop.
      if (!sendObserver[ABORT_SUPPORT]) {
        isAbortSupported = false;
        break;
      }
    }

    if (isAbortSupported) {
      instance.on.pre.prepend(async function (url, init, result) {
        if (abortController.signal.aborted) {
          instance.log(
            `Fetch: ${init.method} ${url.toString()} request aborted at 'pre' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        init.signal = abortController.signal;
        return [url, init, result];
      });

      instance.on.auth.prepend(async (url, init) => {
        if (abortController.signal.aborted) {
          instance.log(
            `Fetch: ${init.method} ${url.toString()} request aborted at 'auth' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        return [url, init];
      });

      instance.on.data.prepend(async (response) => {
        if (abortController.signal.aborted) {
          instance.log(
            `Fetch: request aborted at 'data' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        return [response];
      });

      instance.on.dispose.prepend(() => {
        // Reset internal abortSignal just in case of executing same instance more than once.
        abortController.reset();
      });
    }

    return instance;
  };
}

