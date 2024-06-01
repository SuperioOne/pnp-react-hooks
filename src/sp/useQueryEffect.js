import { InjectAbortSignal } from "../behaviors/internals";
import { compareTuples } from "../utils/compare";
import { deepCompareOptions } from "./deepCompare";
import { errorHandler } from "./errorHandler";
import { insertODataQuery } from "./insertODataQuery";
import { resolveSP } from "./resolveSP";
import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { SPFI } from "@pnp/sp";

/**
 * @typedef TrackedState
 * @property {import("./types.private").InternalPnpHookOptions | null | undefined} options
 * @property {import("react").DependencyList | null | undefined} externalDeps
 */

/** @type{TrackedState} **/
const DEFAULT_STATE = {
  options: null,
  externalDeps: null,
};

/**
 * Reuseable internal hook for simple OData queryable actions.
 * @template {any} TReturn
 * @template {import("./types.private").SharepointQueryable} TContext=import("./types.private").SharepointQueryable
 * @param {(sp: SPFI) => TContext} requestFactory - Creates a proxy Query instance
 * @param {(value: TReturn | null | undefined) => void} stateAction - Callback function to update state
 * @param {import("./types.private").InternalPnpHookOptions} options - PnpHook options.
 * @param {import("react").DependencyList} [deps] - User and hook defined dependency list.
 * @internal
 */
export function useQueryEffect(requestFactory, stateAction, options, deps) {
  /** @type{import("react").MutableRefObject<AbortController | undefined>} **/
  const abortController = useRef(undefined);
  const innerState = useRef(DEFAULT_STATE);
  const cleanup = useCallback(() => {
    abortController.current?.abort();
    abortController.current = undefined;
  }, []);

  // make sure callbacks cancelled when DOM unloads
  useEffect(() => cleanup, [cleanup]);

  useEffect(() => {
    if (options.disabled !== true) {
      const shouldUpdate =
        !compareTuples(innerState.current.externalDeps, deps) ||
        !deepCompareOptions(innerState.current.options, options);

      if (shouldUpdate) {
        cleanup();
        abortController.current = new AbortController();

        if (options?.keepPreviousState !== true) {
          stateAction(undefined);
        }

        const sp = resolveSP(options, [
          InjectAbortSignal(abortController.current),
        ]);

        /** @type{import("./types.private").SharepointQueryable<TReturn>} **/
        let request = requestFactory(sp);
        request = insertODataQuery(request, options.query);

        request()
          .then(stateAction)
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
