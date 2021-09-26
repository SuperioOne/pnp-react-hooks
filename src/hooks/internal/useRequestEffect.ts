import { useRef } from "react";
import { useCallback, useContext, useEffect } from "react";
import { from, NextObserver, Subscription } from "rxjs";
import { compareTuples, resolveWeb, shallowEqual } from "../../utils";
import { LoadActionMode, RenderOptions } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { IWeb } from "@pnp/sp/webs/types";
import { ExceptionOptions, InvokableFactory, Nullable, SharepointQueryable, WebOptions } from "../../types";

export interface _CustomRequestOptions extends ExceptionOptions, RenderOptions, WebOptions { }

/**
 * Unlike useQueryEffect, this hook doesn't insert caching and query options.
 */
export function useRequestEffect<TReturn, TContext extends SharepointQueryable = SharepointQueryable>(
    invokableFactory: InvokableFactory<TContext>,
    stateAction: (value: Nullable<TReturn>) => void,
    options?: _CustomRequestOptions,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const _prevWebOption = useRef<Nullable<IWeb | string>>(null);
    const _prevdependencies = useRef<Nullable<React.DependencyList>>(null);
    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanUp = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(_cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        // TODO: Error handling
        setTimeout(async () => 
        {
            const webOption = globalOptions?.web ?? options?.web;

            const shouldUpdate = !compareTuples(_prevdependencies.current, deps)
                || !shallowEqual(_prevWebOption.current, webOption);

            if (shouldUpdate)
            {
                const mergedOptions = options
                    ? { ...globalOptions, ...options }
                    : globalOptions;

                _cleanUp();

                if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
                {
                    stateAction(undefined);
                }

                const observer: NextObserver<TReturn> = {
                    next: data => stateAction(data),
                    complete: _cleanUp,
                    error: (err: Error) =>
                    {
                        stateAction(null);

                        if (typeof mergedOptions.exception === "function")
                        {
                            mergedOptions.exception(err);
                        }
                        else if (!mergedOptions.exception)
                        {
                            throw err;
                        }
                    }
                };

                const web = resolveWeb(mergedOptions);
                const invokeable = await invokableFactory(web);

                _subscription.current = from(invokeable())
                    .subscribe(observer);
            }

            _prevWebOption.current = webOption;
            _prevdependencies.current = deps;
        }, 0);
    });
}