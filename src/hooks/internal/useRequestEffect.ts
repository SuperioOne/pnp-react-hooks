import { ExceptionOptions, WebOptions } from "../../types/options";
import { IWeb } from "@pnp/sp/webs/types";
import { InvokableFactory } from "../../types/Invokeable";
import { LoadActionOption, RenderOptions } from "../../types/options/RenderOptions";
import { Nullable } from "../../types/utilityTypes";
import { SharepointQueryable } from "../../types/SharepointQueryable";
import { compareTuples } from "../../utils/compareTuples";
import { errorHandler } from "../../utils/errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { resolveWeb } from "../../utils/resolveWeb";
import { shallowEqual } from "../../utils/shallowEqual";
import { useCallback, useEffect } from "react";
import { useRef } from "react";

export interface _CustomRequestOptions extends ExceptionOptions, RenderOptions, WebOptions { }

/**
 * Unlike useQueryEffect, this hook doesn't insert caching and query options.
 */
export function useRequestEffect<
    TReturn,
    TContext extends SharepointQueryable = SharepointQueryable>(
        invokableFactory: InvokableFactory<TContext>,
        stateAction: (value: Nullable<TReturn>) => void,
        options: _CustomRequestOptions,
        deps?: React.DependencyList)
{
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
        if (options?.disabled !== true)
        {
            const shouldUpdate = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, options.web);

            if (shouldUpdate)
            {
                _cleanup();

                if (options?.loadActionOption === LoadActionOption.ClearPrevious)
                {
                    stateAction(undefined);
                }

                setTimeout(async () => 
                {
                    try
                    {
                        const observer: NextObserver<TReturn> = {
                            next: stateAction,
                            complete: _cleanup,
                            error: (err: Error) =>
                            {
                                stateAction(null);
                                errorHandler(err, options);
                            }
                        };

                        const web = resolveWeb(options);
                        const invokeable = await invokableFactory(web);

                        _subscription.current = from(invokeable())
                            .subscribe(observer);
                    }
                    catch (err)
                    {
                        errorHandler(err, options);
                    }
                });

                _innerState.current = {
                    externalDependencies: deps,
                    webOptions: options.web
                };
            }
        }
    }, [stateAction, options, invokableFactory, deps, _cleanup]);
}

interface TrackedState
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
}