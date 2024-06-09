import { LogLevel } from "@pnp/logging";
import { ABORT_SUPPORT } from "./internals";
import { AbortError } from "./abortError";

/**
 * Aborts fetch request and pnpjs timeline at any point.
 * @param {import('./abortSignalSource').AbortSignalSource} abortSignalSource
 * @returns {(arg0:import('@pnp/queryable/queryable.js').Queryable<any>) => import('@pnp/queryable/queryable.js').Queryable<any>}
 */
export function InjectAbortSignal(abortSignalSource) {
  return (instance) => {
    let isAbortSupported = true;

    // All send observers has to support abort controller.
    for (const sendObserver of instance.on.send.toArray()) {
      if (!sendObserver[ABORT_SUPPORT]) {
        isAbortSupported = false;
        break;
      }
    }

    if (isAbortSupported) {
      instance.on.pre.prepend(async function (url, init, result) {
        if (abortSignalSource.signal.aborted) {
          instance.log(
            `Fetch: ${init.method} ${url.toString()} request aborted at 'pre' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        init.signal = abortSignalSource.signal;
        return [url, init, result];
      });

      instance.on.auth.prepend(async (url, init) => {
        if (abortSignalSource.signal.aborted) {
          instance.log(
            `Fetch: ${init.method} ${url.toString()} request aborted at 'auth' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        return [url, init];
      });

      instance.on.data.prepend(async (response) => {
        if (abortSignalSource.signal.aborted) {
          instance.log(
            `Fetch: request aborted at 'data' timeline.`,
            LogLevel.Verbose,
          );
          throw new AbortError();
        }

        return [response];
      });

      instance.on.dispose.prepend(async () => {
        if (abortSignalSource.signal.aborted) {
          abortSignalSource.reset();
        }
      });
    }

    return instance;
  };
}
