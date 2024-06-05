import { LogLevel } from "@pnp/logging";
import { ABORT_SUPPORT, browserFetchRetry } from "./internals.js";

/**
 * Fetch abort support.
 *
 * @param {import('./types.js').RetryOptions} [props] - Retry options.
 * @returns {(arg0:import('@pnp/queryable/queryable.js').Queryable<any>) => import('@pnp/queryable/queryable.js').Queryable<any>}
 */
export function FetchWithAbort(props) {
  /**
   * @type{(this: import("@pnp/queryable").IQueryableInternal, url: URL, init:RequestInit) => Promise<Response>}
   */
  const customFetch = function (url, init) {
    this.log(
      `FetchWithAbort: ${init.method} ${url.toString()}`,
      LogLevel.Verbose,
    );

    return browserFetchRetry(url.toString(), {
      request: init,
      waitTime: props?.waitTime,
      retry: props?.retry,
    });
  };

  Reflect.set(customFetch, ABORT_SUPPORT, true);

  return (instance) => {
    instance.on.send.clear();
    instance.on.send(customFetch);

    return instance;
  };
}
