import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ListItemOptions = PnpHookOptions<ODataQueryable>;

export function useListItem<T>(
    itemId: number,
    list: string,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useListItem<T>: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useListItem<T>: list value is not valid.", "list", list);

        const queryInstance = resolveList(web, list)
            .items
            .getById(itemId);

        return createInvokable(queryInstance);

    }, [itemId, list]);

    const mergedDeps = deps
        ? [itemId, list].concat(deps)
        : [itemId, list];

    useQueryEffect(invokableFactory, setItemData, options, mergedDeps);

    return itemData;
}