import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ErrorAction, ListQuery, ODataQueryable, RequestAction, SPQuery } from "../types";
import { __ignore, deepCompareQuery, insertODataQuery, resolveList, resolveWeb } from "../utils";
import { useState, useEffect, useCallback } from "react";

export interface ListItemQuery extends SPQuery, ODataQueryable, ListQuery { }

export function useListItem<T>(itemId: number, query: ListItemQuery, exception: boolean | ErrorAction = console.error): [T, RequestAction]
{
    const [itemData, setItemData] = useState<T>(undefined);
    const [cachedQuery, setQuery] = useState<ListItemQuery>(query);

    const loadAction: RequestAction = useCallback(async () =>
    {
        try
        {
            if (!isNaN(itemId))
            {
                setItemData(undefined);

                const web = resolveWeb(cachedQuery);
                const list = resolveList(web, cachedQuery);
                const item = list.items.getById(itemId);
                const itemQuery = insertODataQuery(item, cachedQuery);

                const data = await itemQuery.get();

                setItemData(data);
                return true;
            }
        }
        catch (err)
        {
            if (exception)
            {
                if (typeof exception === "function")
                {
                    setItemData(null);
                    exception(err);
                    return false;
                }
                else
                {
                    throw err;
                }
            }
            else
            {
                setItemData(null);
                return false;
            }
        }
    }, [cachedQuery, itemId, exception]);

    useEffect(() =>
    {
        if (!deepCompareQuery(cachedQuery, query))
        {
            loadAction()
                .then(__ignore);

            setQuery(query);
        }
    }, [query, cachedQuery, loadAction]);

    return [itemData, loadAction];
}