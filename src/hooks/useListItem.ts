import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ListQuery, ODataQueryable, SPQuery, RequestAction, ErrorAction } from "../types";
import { resolveWeb, resolveList, insertODataQuery, __ignore, deepCompareQuery } from "../utils";
import { useCallback, useEffect, useState } from "react";

export interface ListItemQuery extends ListQuery, ODataQueryable, SPQuery { }

export function useListItem<T>(itemId: number, query: ListItemQuery, exception: boolean | ErrorAction = false): [undefined | T | null, RequestAction]
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
                    exception(err);
                }
                else
                {
                    throw err;
                }
            }
            else
            {
                setItemData(null);
                console.error(err);
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