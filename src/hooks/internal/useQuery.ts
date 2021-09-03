import "../../extensions/IFetchOptions.extension";
import { InternalContext } from "../../context";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { InvokableFactory, Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions } from "../../types";
import { compareTuples, deepCompareQuery, insertCacheOptions, insertODataQuery, resolveWeb, shallowEqual } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useContext, useEffect } from "react";
import { useRef } from "react";
import { IWeb } from "@pnp/sp/webs";

const ABORT_ERROR = "AbortError";

export default function useQueryEffect<T extends ODataQueryable | ODataQueryableCollection, R>(
    invokableFactory: InvokableFactory<R>,
    stateAction: (value: Nullable<R>) => void,
    options?: PnpHookOptions<Nullable<T>>,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const prevQuery = useRef<Nullable<T>>(undefined);
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

            const observer: NextObserver<R> = {
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

            insertODataQuery(invokeable.__instance, query);
            insertCacheOptions(invokeable.__instance, mergedOptions);

            subscription.current = from(
                invokeable({
                    signal: abortController.current?.signal
                }))
                .subscribe(observer);
        }

        prevQuery.current = query;
        prevWebOption.current = webOption;
        prevdependencies.current = deps;
    });
}