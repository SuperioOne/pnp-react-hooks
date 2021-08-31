import "../../extensions/IFetchOptions.extension";
import { InternalContext } from "../../context";
import { LoadActionMode } from "../../types/options/RenderOptions";
import { Nullable, PnpHookOptions, RequestAction } from "../../types";
import { compareTuples, deepCompareQuery } from "../../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useContext, useEffect } from "react";
import { useRef } from "react";

const ABORT_ERROR = "AbortError";

export default function useQueryEffect<T extends Record<string, unknown>, R>(
    loadAction: RequestAction<R>,
    stateAction: (value: Nullable<R>) => void,
    options?: PnpHookOptions<Nullable<T>>,
    deps?: React.DependencyList)
{
    const defaultOptions = useContext(InternalContext);

    const cachedQuery = useRef<Nullable<T>>(undefined);
    const dependencies = useRef<Nullable<React.DependencyList>>(null);
    const abortController = useRef<Nullable<AbortController>>(undefined);
    const subscription = useRef<Nullable<Subscription>>(undefined);

    // Component unmount cleanup
    useEffect(() =>
        () =>
        {
            subscription.current?.unsubscribe();
            abortController.current = undefined;
            subscription.current = undefined;
        }, []);

    useEffect(() =>
    {
        const query = options?.query;

        if (!deepCompareQuery(cachedQuery.current, query) || !compareTuples(dependencies.current, deps))
        {
            const mergedOptions = options
                ? { ...defaultOptions, ...options }
                : defaultOptions;

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
                next: data =>
                {
                    stateAction(data);
                    subscription.current?.unsubscribe();
                    abortController.current = undefined;
                    subscription.current = undefined;
                },
                error: (err: Error) =>
                {
                    if (err.name === ABORT_ERROR)
                    {
                        return;
                    }

                    if (typeof mergedOptions?.exception === "function")
                    {
                        mergedOptions.exception(err);
                    }
                    else if (!mergedOptions?.exception)
                    {
                        throw err;
                    }
                }
            }

            subscription.current = from(loadAction({ signal: abortController.current?.signal }))
                .subscribe(observer);
        }

        cachedQuery.current = query;
        dependencies.current = deps;

    }, [deps, loadAction, defaultOptions, options, stateAction]);
}