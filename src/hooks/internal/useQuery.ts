import "../../extensions/IFetchOptions.extension";
import { InternalContext } from "../../context";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { Nullable, PnpHookOptions, RequestAction } from "../../types";
import { compareTuples, deepCompareQuery, insertCacheOptions, insertODataQuery, resolveWeb } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useContext, useEffect } from "react";
import { useRef } from "react";

const ABORT_ERROR = "AbortError";

export default function useQueryEffect<T extends Record<string, unknown>, R>(
    loadAction: RequestAction<R>,
    stateAction: (value: Nullable<R>) => void,
    options?: PnpHookOptions<Nullable<T>>,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const cachedQuery = useRef<Nullable<T>>(undefined);
    const dependencies = useRef<Nullable<React.DependencyList>>(null);
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

        if (!deepCompareQuery(cachedQuery.current, query) || !compareTuples(dependencies.current, deps))
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

            let spQuery = loadAction(web);
            spQuery = insertODataQuery(spQuery, query);
            spQuery = insertCacheOptions(spQuery, query);

            subscription.current = from(spQuery.get({ signal: abortController.current?.signal }))
                .subscribe(observer);
        }

        cachedQuery.current = query;
        dependencies.current = deps;

    }, [deps, loadAction, globalOptions, options, stateAction, _cleanUp]);
}