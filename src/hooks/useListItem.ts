import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { IFetchOptions } from "@pnp/common";
import { ListInfo, Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { insertODataQuery, resolveList, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export type ListItemOptions = PnpHookOptions<Nullable<ODataQueryable>>;

export function useListItem<T>(
    itemId: number,
    list: ListInfo,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>(undefined);

    const loadAction = useCallback((fetchOptions?: IFetchOptions) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useListItem<T>: itemId value is not valid.", itemId);

        if (!list)
            throw new ParameterError("useListItem<T>: list value is not valid.", list);

        setItemData(undefined);

        const web = resolveWeb(options);
        const splist = resolveList(web, list);
        const item = splist.items.getById(itemId);

        return insertODataQuery(item, options?.query)
            .get(fetchOptions);

    }, [itemId, options, list]);


    const mergedDeps = deps ? [itemId, list, options?.web, ...deps] : [itemId, list, options?.web];

    useQueryEffect(loadAction, setItemData, options, mergedDeps);

    return itemData;
}