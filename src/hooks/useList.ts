import { IListInfo } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { InternalContext } from "../context";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";

export interface ListOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

export function useList(
    list: string,
    options?: ListOptions,
    deps?: React.DependencyList): Nullable<IListInfo>
{
    const globalOptions = useContext(InternalContext);
    const [listInfo, setListInfo] = useState<Nullable<IListInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const queryInst = resolveList(web, list);

        return createInvokable(queryInst);
    }, [list]);

    const _mergedDeps = mergeDependencies([list], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

        return opt;
    }, [list, options, globalOptions]);

    useQueryEffect(invokableFactory, setListInfo, _options, _mergedDeps);

    return listInfo;
}