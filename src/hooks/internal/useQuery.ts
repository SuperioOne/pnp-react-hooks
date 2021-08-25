import type { ErrorAction, RequestAction } from "../../types";
import { __ignore, compareTuples, deepCompareQuery } from "../../utils";
import { useEffect } from "react";
import { useRef } from "react";

export default function useQueryEffect<T extends Record<string, unknown>>(
    action: RequestAction,
    query: T, exceptionPolicy: boolean | ErrorAction,
    deps?: React.DependencyList)
{
    const cachedQuery = useRef<T>(query);
    const dependencies = useRef<React.DependencyList>(deps);

    useEffect(() =>
    {
        if (!deepCompareQuery(cachedQuery.current, query) || !compareTuples(dependencies.current, deps))
        {
            action()
                .then(__ignore)
                .catch(err => 
                {
                    if (exceptionPolicy)
                    {
                        if (typeof exceptionPolicy === "function")
                        {
                            exceptionPolicy(err);
                            return false;
                        }
                        else
                        {
                            throw err;
                        }
                    }
                });
        }

        cachedQuery.current = query;
        dependencies.current = deps;

    }, [action, deps, exceptionPolicy, query]);
}