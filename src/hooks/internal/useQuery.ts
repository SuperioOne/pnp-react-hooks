import "../../extensions/IFetchOptions.extension";
import { Nullable, PnpHookOptions, RequestAction } from "../../types";
import { compareTuples, deepCompareQuery } from "../../utils";
import { from, NextObserver } from "rxjs";
import { useEffect } from "react";
import { useRef } from "react";
import { LoadActionOption } from "../../types/options/RenderOptions";

const ABORT_ERROR = "AbortError";

export default function useQueryEffect<T extends Record<string, unknown>, R>(
    loadAction: RequestAction<R>,
    stateAction: React.Dispatch<React.SetStateAction<Nullable<R>>>,
    query?: T,
    options?: PnpHookOptions,
    deps?: React.DependencyList)
{
    const cachedQuery = useRef<T | undefined>(undefined);
    const dependencies = useRef<React.DependencyList | undefined>(undefined);
    const abortController = useRef<AbortController | undefined>(undefined);

    useEffect(() =>
    {
        if (!deepCompareQuery(cachedQuery.current, query) || !compareTuples(dependencies.current, deps))
        {
            abortController.current?.abort();
            abortController.current = AbortController
                ? new AbortController()
                : undefined;

            if (options?.loadActionOption === undefined || options.loadActionOption !== LoadActionOption.KeepPrevious)
            {
                stateAction(undefined);
            }

            const observer: NextObserver<R> = {
                next: data => stateAction(data),
                error: (err: Error) =>
                {
                    if (err.name === ABORT_ERROR)
                    {
                        return;
                    }

                    if (typeof options?.exception === "function")
                    {
                        options.exception(err);
                    }
                    else if (!options?.exception)
                    {
                        throw err;
                    }
                }
            }

            const subscription = from(loadAction({ signal: abortController.current?.signal }))
                .subscribe(observer);

            return () => subscription?.unsubscribe();
        }

        cachedQuery.current = query;
        dependencies.current = deps;
    }, [deps, loadAction, options, query, stateAction]);
}