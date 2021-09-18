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
 * Unlike useQueryEffect, this hook doesn't check and insert caching and query options for complex queries.
 */
export function useRequestEffect<TReturn, TContext extends SharepointQueryable = SharepointQueryable>(
    invokableFactory: InvokableFactory<TContext>,
    stateAction: (value: Nullable<TReturn>) => void,
    options?: _CustomRequestOptions,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const prevWebOption = useRef<Nullable<IWeb | string>>(null);
    const prevdependencies = useRef<Nullable<React.DependencyList>>(null);

    const subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanUp = useCallback(() =>
    {
        subscription.current?.unsubscribe();
        subscription.current = undefined;
    }, []);

    useEffect(_cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        const webOption = globalOptions?.web ?? options?.web;

        const shouldUpdate = !compareTuples(prevdependencies.current, deps)
            || !shallowEqual(prevWebOption.current, webOption);

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
            const invokeable = invokableFactory(web);

            subscription.current = from(invokeable())
                .subscribe(observer);
        }

        prevWebOption.current = webOption;
        prevdependencies.current = deps;
    });
}