import { useRef } from "react";
import { useCallback, useContext, useEffect } from "react";
import { from, NextObserver, Subscription } from "rxjs";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { IWeb } from "@pnp/sp/webs/types";
import { shallowEqual, resolveWeb, insertODataQuery, insertCacheOptions, errorHandler, deepCompareQuery, compareTuples } from "../../utils";
import { InvokableFactory, Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions, SharepointQueryable } from "../../types";

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
        // TODO: Error handling
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

            _innerState.current = {
                externalDependencies: deps,
                query: query,
                webOptions: webOption
            };

        }, 0);
    });
}

interface TrackedState<T>
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    query: Nullable<T>;
}