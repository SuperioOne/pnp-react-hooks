import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ListQuery } from "../types/ListQuery";
import type { ODataQueryable } from "../types/ODataQueryable";
import type { RequestAction } from "../types/RequestAction";
import type { SPQuery } from "../types/SPQuery";
import { compareArray } from "../utils/deepComparisons/compareArray";
import { __ignore } from "../utils/ignore";
import { insertODataQuery } from "../utils/insertODataQuery";
import { resolveList } from "../utils/resolveList";
import { resolveWeb } from "../utils/resolveWeb";
import { useCallback, useEffect, useState } from "react";
import { ErrorAction } from "../types/ErrorAction";

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
        if (!_areEqual(cachedQuery, query))
        {
            loadAction()
                .then(__ignore);

            setQuery(query);
        }
    }, [query, cachedQuery, loadAction]);

    return [itemData, loadAction];
}

/**
 * Deep equality check for list item query
 */
const _areEqual = (left: ListItemQuery, right: ListItemQuery) =>
    left !== undefined
    && right !== undefined
    && right.list === left.list
    && right.web === left.web
    && compareArray(left.select, right.select)
    && compareArray(left.expand, right.expand);
