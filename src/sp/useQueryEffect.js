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
 * @property {import("./types")._PnpHookOptions | null | undefined} options
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
 * @param {(sp: SPFI) => Promise<TContext>} invokableFactory - Creates a proxy Query instance
 * @param {(value: TReturn | null | undefined) => void} stateAction - Callback function to update state
 * @param {import("./types")._PnpHookOptions} options - PnpHook options.
 * @param {import("react").DependencyList} [deps] - User and hook defined dependecy list.
 * @internal
 */
export function useQueryEffect(invokableFactory, stateAction, options, deps) {
  const innerState = useRef(DEFAULT_STATE);

  /** @type{import("react").MutableRefObject<AbortController | undefined>} **/
  const abortController = useRef(new AbortController());
  const cleanup = useCallback(() => {
    abortController.current?.abort();
    abortController.current = undefined;
  }, []);

  // make sure callbacks cancelled when DOM unloads
  useEffect(() => cleanup, [cleanup]);

  useEffect(() => {
    if (options.disabled !== true) {
      const shouldUpdate =
        !deepCompareOptions(innerState.current.options, options) ||
        !compareTuples(innerState.current.externalDeps, deps);

      if (shouldUpdate) {
        cleanup();
        abortController.current = new AbortController();

        if (options?.keepPreviousState !== true) {
          stateAction(undefined);
        }

        const sp = resolveSP(options, [
          InjectAbortSignal(abortController.current),
        ]);

        setTimeout(async () => {
          try {
            /** @type{import("./types.private").SharepointQueryable<TReturn>} **/
            let invokeable = await invokableFactory(sp);
            invokeable = insertODataQuery(invokeable, options.query);
            const response = await invokeable();

            if (abortController.current?.signal.aborted !== true) {
              stateAction(response);
            }
          } catch (err) {
            if (err.name !== "AbortError") {
              stateAction(null);
              errorHandler(err, options);
            }
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
