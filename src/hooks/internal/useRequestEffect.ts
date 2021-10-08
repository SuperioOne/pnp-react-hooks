import { useRef } from "react";
import { useCallback, useContext, useEffect } from "react";
import { from, NextObserver, Subscription } from "rxjs";
import { compareTuples, errorHandler, resolveWeb, shallowEqual } from "../../utils";
import { LoadActionMode, RenderOptions } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { IWeb } from "@pnp/sp/webs/types";
import { ExceptionOptions, InvokableFactory, Nullable, SharepointQueryable, WebOptions } from "../../types";

export interface _CustomRequestOptions extends ExceptionOptions, RenderOptions, WebOptions { }

/**
 * Unlike useQueryEffect, this hook doesn't insert caching and query options.
 */
export function useRequestEffect<
    TReturn,
    TContext extends SharepointQueryable = SharepointQueryable>(
        invokableFactory: InvokableFactory<TContext>,
        stateAction: (value: Nullable<TReturn>) => void,
        options?: _CustomRequestOptions,
        deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        webOptions: null
    });

    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        setTimeout(async () => 
        {
            const webOption = options?.web ?? globalOptions?.web;

            const shouldUpdate = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, webOption);

            if (shouldUpdate)
            {
                const mergedOptions = options
                    ? { ...globalOptions, ...options }
                    : globalOptions;

                try
                {
                    _cleanup();

                    if (mergedOptions?.loadActionOption === LoadActionMode.ClearPrevious)
                    {
                        stateAction(undefined);
                    }

                    const observer: NextObserver<TReturn> = {
                        next: stateAction,
                        complete: _cleanup,
                        error: (err: Error) =>
                        {
                            stateAction(null);
                            errorHandler(err, mergedOptions);
                        }
                    };

                    const web = resolveWeb(mergedOptions);
                    const invokeable = await invokableFactory(web);

                    _subscription.current = from(invokeable())
                        .subscribe(observer);
                }
                catch (err)
                {
                    errorHandler(err, mergedOptions);
                }
            }
            
            _innerState.current = {
                externalDependencies: deps,
                webOptions: webOption
            };
        }, 0);
    }, [stateAction, options, invokableFactory, globalOptions, deps, _cleanup]);
}

interface TrackedState
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
}