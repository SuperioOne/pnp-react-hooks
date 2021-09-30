import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, mergeDependencies, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ListItemOptions = PnpHookOptions<ODataQueryable>;

export function useListItem<T>(
    itemId: number,
    list: string,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useListItem<T>: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useListItem<T>: list value is not valid.", "list", list);

        const queryInst = resolveList(web, list)
            .items
            .getById(itemId);

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = mergeDependencies([itemId, list], deps);

    useQueryEffect(invokableFactory, setItemData, options, _mergedDeps);

    return itemData;
}