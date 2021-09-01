import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { CacheOptions, Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { resolveList } from "../utils";
import { useState, useCallback } from "react";
import { IWeb } from "@pnp/sp/webs";

export interface ListItemOptions extends PnpHookOptions<ODataQueryable>, CacheOptions { }

export function useListItem<T>(
    itemId: number,
    list: string,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>(undefined);

    const loadAction = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useListItem<T>: itemId value is not valid.", itemId);

        if (!list)
            throw new ParameterError("useListItem<T>: list value is not valid.", list);

        return resolveList(web, list)
            .items
            .getById(itemId);

    }, [itemId, list]);

    const mergedDeps = deps
        ? [itemId, list, options?.web, ...deps]
        : [itemId, list, options?.web];

    useQueryEffect(loadAction, setItemData, options, mergedDeps);

    return itemData;
}