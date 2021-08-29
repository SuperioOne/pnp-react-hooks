import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { IFetchOptions } from "@pnp/common";
import { ListQuery, Nullable, ODataQueryable, PnpHookOptions, SPQuery } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { insertODataQuery, resolveList, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface ListItemQuery extends SPQuery, ODataQueryable, ListQuery { }

export function useListItem<T>(
    itemId: number,
    query: ListItemQuery,
    options?: PnpHookOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>(undefined);

    const loadAction = useCallback((fetchOptions?: IFetchOptions) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useListItem<T>: itemId value is not valid.", itemId);

        if (!query)
            throw new ParameterError("useListItem<T>: query value is not valid.", query);

        setItemData(undefined);

        const web = resolveWeb(query);
        const list = resolveList(web, query);
        const item = list.items.getById(itemId);

        return insertODataQuery(item, query)
            .get(fetchOptions);

    }, [itemId, query]);

    const mergedDeps = deps ? [itemId, ...deps] : [itemId];

    useQueryEffect(loadAction, setItemData, query, options, mergedDeps);

    return itemData;
}