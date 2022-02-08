import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IChangeQuery } from "@pnp/sp/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { RenderOptions, ExceptionOptions, WebOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { shallowEqual } from "../utils/shallowEqual";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";

export interface ChangesOptions extends RenderOptions, ExceptionOptions, WebOptions
{
    list?: string;
    disabled?: DisableOptionValueType | { (changeQuery: IChangeQuery): boolean };
}

export function useChanges<T>(
    changeQuery: IChangeQuery,
    options?: ChangesOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, changeQuery);

        return opt;
    }, [changeQuery, globalOptions, options]);

    useRequestEffect(invokableFactory, setChanges, _options, _mergedDeps);

    return changes;
}