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
