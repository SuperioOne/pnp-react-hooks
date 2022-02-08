import { IWeb } from "@pnp/sp/webs/types";
import { InvokableFactory } from "../../types/Invokeable";
import { LoadActionOption } from "../../types/options/RenderOptions";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable, ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SharepointQueryable } from "../../types/SharepointQueryable";
import { compareTuples } from "../../utils/compareTuples";
import { deepCompareQuery } from "../../utils/deepCompareQuery";
import { errorHandler } from "../../utils/errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { insertCacheOptions } from "../../utils/insertCacheOptions";
import { insertODataQuery } from "../../utils/insertODataQuery";
import { resolveWeb } from "../../utils/resolveWeb";
import { shallowEqual } from "../../utils/shallowEqual";
import { useCallback, useEffect } from "react";
import { useRef } from "react";

export function useQueryEffect<
    TQuery extends ODataQueryable | ODataQueryableCollection,
    TReturn,
    TContext extends SharepointQueryable = SharepointQueryable>(
        invokableFactory: InvokableFactory<TContext>,
        stateAction: (value: Nullable<TReturn>) => void,
        options: PnpHookOptions<Nullable<TQuery>>,
        deps?: React.DependencyList)
{
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
        if (options.disabled !== true)
        {
            const query = options?.query;

            const shouldUpdate = !deepCompareQuery(_innerState.current.query, query)
                || !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, options.web);

            if (shouldUpdate)
            {
                _cleanup();

                if (options?.loadActionOption !== LoadActionOption.KeepPrevious)
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

                        insertODataQuery(invokeable, query);
                        insertCacheOptions(invokeable, options);

                        _subscription.current = from(invokeable())
                            .subscribe(observer);
                    }
                    catch (err)
                    {
                        errorHandler(err, options);
                    }
                });
            }

            _innerState.current = {
                externalDependencies: deps,
                query: query,
                webOptions: options.web
            };
        }
    });
}

interface TrackedState<T>
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    query: Nullable<T>;
}