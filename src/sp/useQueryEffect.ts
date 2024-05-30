import { InjectAbort, ManagedAbort } from "../behaviors/internals";
import { _PnpHookOptions } from "./types";
import { compareTuples } from "../utils/compare";
import { deepCompareOptions } from "./deepCompare";
import { errorHandler } from "./errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { insertODataQuery } from "./insertODataQuery";
import { resolveSP } from "./resolveSP";
import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { SPFI } from "@pnp/sp";
import { SharepointQueryable } from "./types.private";

export type InvokableFactory<
  TContext extends SharepointQueryable = SharepointQueryable,
> = (sp: SPFI) => Promise<TContext>;

/**
 * Reuseable internal hook for simple OData queryable actions.
 * @param invokableFactory Creates a proxy Query instance
 * @param stateAction Callback function to update state
 * @param options PnpHook options.
 * @param deps User and hook defined dependecy list.
 * @internal
 */
export function useQueryEffect<
  TReturn,
  TContext extends SharepointQueryable = SharepointQueryable,
>(
  invokableFactory: InvokableFactory<TContext>,
  stateAction: (value: TReturn | null | undefined) => void,
  options: _PnpHookOptions,
  deps?: React.DependencyList,
) {
  const _innerState = useRef<_TrackedState>({
    externalDependencies: null,
    options: null,
  });

  const _subscription = useRef<Subscription | null | undefined>(undefined);
  const _abortController = useRef<ManagedAbort>(new ManagedAbort());

  const _cleanup = useCallback(() => {
    _subscription.current?.unsubscribe();
    _subscription.current = undefined;
    _abortController.current?.abort();
  }, []);

  // make sure callbacks cancelled when DOM unloads
  useEffect(() => _cleanup, [_cleanup]);

  useEffect(() => {
    if (options.disabled !== true) {
      const shouldUpdate =
        !deepCompareOptions(_innerState.current.options, options) ||
        !compareTuples(_innerState.current.externalDependencies, deps);

      if (shouldUpdate) {
        _cleanup();
        _abortController.current = new ManagedAbort();

        if (options?.keepPreviousState !== true) {
          stateAction(undefined);
        }

        setTimeout(async () => {
          try {
            const observer: NextObserver<TReturn> = {
              next: stateAction,
              complete: _cleanup,
              error: (err: Error) => {
                if (err.name !== "AbortError") {
                  stateAction(null);
                  errorHandler(err, options);
                }
              },
            };

            const sp = resolveSP(options, [
              InjectAbort(_abortController.current),
            ]);
            let invokeable = await invokableFactory(sp);

            invokeable = insertODataQuery(invokeable, options.query);

            _subscription.current = from(invokeable()).subscribe(observer);
          } catch (err) {
            errorHandler(err, options);
          }
        });
      }

      _innerState.current = {
        externalDependencies: deps,
        options: options,
      };
    }
  });
}

interface _TrackedState {
  options: _PnpHookOptions | null | undefined;
  externalDependencies: React.DependencyList | null | undefined;
}
