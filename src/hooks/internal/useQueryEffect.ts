import { useRef } from "react";
import { useCallback, useContext, useEffect } from "react";
import { shallowEqual } from "../../utils/shallowEqual";
import { resolveWeb } from "../../utils/resolveWeb";
import { insertODataQuery } from "../../utils/insertODataQuery";
import { insertCacheOptions } from "../../utils/insertCacheOptions";
import { from, NextObserver, Subscription } from "rxjs";
import { errorHandler } from "../../utils/errorHandler";
import { deepCompareQuery } from "../../utils/deepCompareQuery";
import { compareTuples } from "../../utils/compareTuples";
import { SharepointQueryable } from "../../types/SharepointQueryable";
import { PnpHookOptions } from "../../types/options";
import { ODataQueryable, ODataQueryableCollection } from "../../types/ODataQueryable";
import { Nullable } from "../../types/utilityTypes";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { InvokableFactory } from "../../types/Invokeable";
import { InternalContext } from "../../context";
import { IWeb } from "@pnp/sp/webs/types";

export function useQueryEffect<
    TQuery extends ODataQueryable | ODataQueryableCollection,
    TReturn,
    TContext extends SharepointQueryable = SharepointQueryable>(
        invokableFactory: InvokableFactory<TContext>,
        stateAction: (value: Nullable<TReturn>) => void,
        options?: PnpHookOptions<Nullable<TQuery>>,
        deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const _innerState = useRef<TrackedState<TQuery>>({
        externalDependencies: null,
        query: undefined,
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
            setTimeout(async () =>
            {
                const query = options?.query;
                const webOption = options?.web ?? globalOptions?.web;

                const shouldUpdate = !deepCompareQuery(_innerState.current.query, query)
                    || !compareTuples(_innerState.current.externalDependencies, deps)
                    || !shallowEqual(_innerState.current.webOptions, webOption);

                if (shouldUpdate)
                {
                    const mergedOptions = options
                        ? { ...globalOptions, ...options }
                        : globalOptions;

                    try
                    {
                        _cleanup();

                        if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
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

                        insertODataQuery(invokeable, query);
                        insertCacheOptions(invokeable, mergedOptions);

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
                    query: query,
                    webOptions: webOption
                };
            }, 0);
        }
    });
}

interface TrackedState<T>
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    query: Nullable<T>;
}