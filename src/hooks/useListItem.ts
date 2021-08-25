import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ErrorAction, ListQuery, ODataQueryable, RequestAction, SPQuery } from "../types";
import useQueryEffect from "./internal/useQuery";
import { insertODataQuery, resolveList, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface ListItemQuery extends SPQuery, ODataQueryable, ListQuery { }

export function useListItem<T>(
    itemId: number,
    query: ListItemQuery,
    exception: boolean | ErrorAction = console.error): [T, RequestAction]
{
    const [itemData, setItemData] = useState<T>(undefined);

    const loadAction: RequestAction = useCallback(async () =>
    {
        try
        {
            if (!isNaN(itemId))
            {
                setItemData(undefined);

                const web = resolveWeb(query);
                const list = resolveList(web, query);
                const item = list.items.getById(itemId);

                const data = await insertODataQuery(item, query).get();

                setItemData(data);
                return true;
            }
        }
        catch (err)
        {
            setItemData(null);
            throw err;
        }
    }, [itemId, query]);

    useQueryEffect(loadAction, query, exception, [itemId]);

    return [itemData, loadAction];
}