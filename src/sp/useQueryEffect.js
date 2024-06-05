import { AbortSignalSource } from "../behaviors/abortSignalSource.js";
import { InjectAbortSignal } from "../behaviors/injectAbortSignal.js";
import { compareTuples } from "../utils/compare.js";
import { deepCompareOptions } from "./deepCompare.js";
import { errorHandler } from "./errorHandler.js";
import { insertODataQuery } from "./insertODataQuery.js";
import { resolveSP } from "./resolveSP.js";
import { useEffect, useRef } from "react";

/**
 * @typedef TrackedState
 * @property {import("./types.private.js").InternalPnpHookOptions | null | undefined} options
 * @property {import("react").DependencyList | null | undefined} externalDeps
 */

/** @type{TrackedState} **/
export const DEFAULT_STATE = {
  options: null,
  externalDeps: null,
};

/**
 * Reuseable internal hook for simple OData queryable actions.
 *
 * @template {any} TReturn
 * @template {import("./types.private.js").SharepointQueryable} TContext=import("./types.private").SharepointQueryable
 * @param {(sp: import('@pnp/sp').SPFI) => TContext} requestFactory - Creates a proxy Query instance
 * @param {(value: TReturn | null | undefined) => void} stateAction - Callback function to update state
 * @param {import("./types.private.js").InternalPnpHookOptions} options - PnpHook options.
 * @param {import("react").DependencyList} [deps] - User and hook defined dependency list.
 */
export function useQueryEffect(requestFactory, stateAction, options, deps) {
  /** @type{import("react").MutableRefObject<AbortSignalSource>} **/
  const abortSource = useRef(new AbortSignalSource());
  const innerState = useRef(DEFAULT_STATE);

  useEffect(() => abortSource.current.abort(), []);

  useEffect(() => {
    if (options.disabled === true) {
      abortSource.current.abort();
    } else {
      const shouldUpdate =
        !compareTuples(innerState.current.externalDeps, deps) ||
        !deepCompareOptions(innerState.current.options, options);

      if (shouldUpdate) {
        abortSource.current.abort();
        abortSource.current.reset();

        if (options?.keepPreviousState !== true) {
          stateAction(undefined);
        }

        const sp = resolveSP(options, [InjectAbortSignal(abortSource.current)]);
        const signalRef = abortSource.current.signal;

        /** @type{import("./types.private.js").SharepointQueryable<TReturn>} **/
        let request = requestFactory(sp);
        request = insertODataQuery(request, options.query);

        request()
          .then((result) => {
            if (!signalRef.aborted) {
              stateAction(result);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              stateAction(null);
              errorHandler(err, options);
            }
          });
      }

      innerState.current = {
        externalDeps: deps,
        options: options,
      };
    }
  });
}
