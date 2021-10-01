import { IListInfo } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable, mergeDependencies, resolveList } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

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