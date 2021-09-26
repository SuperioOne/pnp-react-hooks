import { IListInfo } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
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
        if (!list)
            throw new ParameterError("useList: list value is not valid.", "list", list);

        const queryInst = resolveList(web, list);

        return createInvokable(queryInst);

    }, [list]);

    const _mergedDeps = deps
        ? [list].concat(deps)
        : [list];

    useQueryEffect(invokableFactory, setListInfo, options, _mergedDeps);

    return listInfo;
}