import "../../extensions/IFetchOptions.extension";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { InvokableFactory, Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions, SharepointQueryable } from "../../types";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { compareTuples, deepCompareQuery, insertCacheOptions, insertODataQuery, resolveWeb, shallowEqual } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useContext, useEffect } from "react";
import { useRef } from "react";

const ABORT_ERROR = "AbortError";

export default function useQueryEffect<TQuery extends ODataQueryable | ODataQueryableCollection, TReturn, TContext extends SharepointQueryable = SharepointQueryable>(
    invokableFactory: InvokableFactory<TReturn, TContext>,
    stateAction: (value: Nullable<TReturn>) => void,
    options?: PnpHookOptions<Nullable<TQuery>>,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const prevQuery = useRef<Nullable<TQuery>>(undefined);
    const prevWebOption = useRef<Nullable<IWeb | string>>(null);
    const prevdependencies = useRef<Nullable<React.DependencyList>>(null);

    const abortController = useRef<Nullable<AbortController>>(undefined);
    const subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanUp = useCallback(() =>
    {
        subscription.current?.unsubscribe();
        abortController.current = undefined;
        subscription.current = undefined;
    }, []);

    // Component unmount cleanup
    useEffect(() => _cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        const query = options?.query;
        const webOption = globalOptions?.web ?? options?.web;

        const shouldUpdate = !deepCompareQuery(prevQuery.current, query)
            || !compareTuples(prevdependencies.current, deps)
            || !shallowEqual(prevWebOption.current, webOption);

        if (shouldUpdate)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            subscription.current?.unsubscribe();
            abortController.current?.abort();

            abortController.current = AbortController
                ? new AbortController()
                : undefined;

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
            {
                stateAction(undefined);
            }

            const observer: NextObserver<TReturn> = {
                next: data => stateAction(data),
                complete: _cleanUp,
                error: (err: Error) =>
                {
                    if (err.name === ABORT_ERROR)
                    {
                        return;
                    }

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

            insertODataQuery(invokeable.instance, query);
            insertCacheOptions(invokeable.instance, mergedOptions);

            subscription.current = from(
                invokeable.invoke({
                    signal: abortController.current?.signal
                }))
                .subscribe(observer);
        }

        prevQuery.current = query;
        prevWebOption.current = webOption;
        prevdependencies.current = deps;
    });
}