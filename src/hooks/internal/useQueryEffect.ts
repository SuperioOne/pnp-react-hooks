import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { InvokableFactory, Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions, SharepointQueryable } from "../../types";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { compareTuples, deepCompareQuery, insertCacheOptions, insertODataQuery, resolveWeb, shallowEqual } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useContext, useEffect } from "react";
import { useRef } from "react";

export function useQueryEffect<TQuery extends ODataQueryable | ODataQueryableCollection, TReturn, TContext extends SharepointQueryable = SharepointQueryable>(
    invokableFactory: InvokableFactory<TContext>,
    stateAction: (value: Nullable<TReturn>) => void,
    options?: PnpHookOptions<Nullable<TQuery>>,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const _prevQuery = useRef<Nullable<TQuery>>(undefined);
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
        const query = options?.query;
        const webOption = globalOptions?.web ?? options?.web;

        const shouldUpdate = !deepCompareQuery(_prevQuery.current, query)
            || !compareTuples(_prevdependencies.current, deps)
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
            const invokeable = invokableFactory(web);

            insertODataQuery(invokeable, query);
            insertCacheOptions(invokeable, mergedOptions);

            _subscription.current = from(invokeable())
                .subscribe(observer);
        }

        _prevQuery.current = query;
        _prevWebOption.current = webOption;
        _prevdependencies.current = deps;
    });
}