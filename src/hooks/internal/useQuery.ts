import { ErrorAction, RequestAction } from "../../types";
import { __ignore, compareTuples, deepCompareQuery } from "../../utils";
import { useEffect } from "react";
import { useRef } from "react";

export default function useQueryEffect<T extends Record<string, unknown>>(
    action: RequestAction,
    query?: T,
    exceptionPolicy?: ErrorAction,
    deps?: React.DependencyList)
{
    const cachedQuery = useRef<T | undefined>(undefined);
    const dependencies = useRef<React.DependencyList | undefined>(undefined);

    useEffect(() =>
    {
        if (!deepCompareQuery(cachedQuery.current, query) || !compareTuples(dependencies.current, deps))
        {
            action()
                .then(__ignore)
                .catch(err => 
                {
                    if (typeof exceptionPolicy === "function")
                    {
                        exceptionPolicy(err);
                    }
                    else if (!exceptionPolicy)
                    {
                        throw err;
                    }

                    return false;
                });
        }

        cachedQuery.current = query;
        dependencies.current = deps;

    }, [action, deps, exceptionPolicy, query]);
}