import { useState, useCallback } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";
import { resolveList } from "../utils/resolveList";
import { mergeDependencies } from "../utils/mergeDependencies";
import { createInvokable } from "../utils/createInvokable";
import { PnpHookOptions } from "../types/options";
import { ODataQueryable } from "../types/ODataQueryable";
import { Nullable } from "../types/utilityTypes";
import { IWeb } from "@pnp/sp/webs/types";
import { IListInfo } from "@pnp/sp/lists/types";

export type ListOptions = PnpHookOptions<ODataQueryable>;

export function useList(
    list: string,
    options?: ListOptions,
    deps?: React.DependencyList): Nullable<IListInfo>
{
    const [listInfo, setListInfo] = useState<Nullable<IListInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const queryInst = resolveList(web, list);

        return createInvokable(queryInst);

    }, [list]);

    const _mergedDeps = mergeDependencies([list], deps);

    useQueryEffect(invokableFactory, setListInfo, options, _mergedDeps);

    return listInfo;
}