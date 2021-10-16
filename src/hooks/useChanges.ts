import { ExceptionOptions, Nullable, RenderOptions, WebOptions } from "../types";
import { IChangeQuery } from "@pnp/sp/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable, mergeDependencies, resolveScope, shallowEqual } from "../utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";

export interface ChangesOptions extends RenderOptions, ExceptionOptions, WebOptions
{
    list?: string;
}

export function useChanges<T>(
    changeQuery: IChangeQuery,
    options?: ChangesOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const [changes, setChanges] = useState<Nullable<T[]>>();
    const _changeQery = useRef<IChangeQuery>(changeQuery);

    useEffect(() =>
    {
        if (!shallowEqual(changeQuery, _changeQery.current))
        {
            _changeQery.current = changeQuery;
        }
    }, [changeQuery]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, {
            list: options?.list
        });

        const action = function (this: IList | IWeb)
        {
            return this.getChanges(_changeQery.current) as Promise<T>;
        };

        return createInvokable(scope, action);

    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list, _changeQery], deps);

    useRequestEffect(invokableFactory, setChanges, options, _mergedDeps);

    return changes;
}