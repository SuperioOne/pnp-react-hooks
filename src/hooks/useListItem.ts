import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ListQuery } from "../types/ListQuery";
import type { ODataQueryable } from "../types/ODataQueryable";
import type { SPQuery } from "../types/SPQuery";
import { AreEqual } from "../utils/arrayEquality";
import { insertODataQuery } from "../utils/insertODataQuery";
import { resolveList } from "../utils/resolveList";
import { resolveWeb } from "../utils/resolveWeb";
import { useEffect, useState } from "react";

export interface ListItemQuery extends ListQuery, ODataQueryable, SPQuery { }

// TODO : Error propagation
export function useListItem<T>(itemId: number, query: ListItemQuery): undefined | T
{
    const [itemData, setItemData] = useState<T>(undefined);
    const [cachedQuery, setQuery] = useState<ListItemQuery>(query);

    useEffect(() =>
    {
        if (!_areEqual(cachedQuery, query))
        {
            setQuery(query);
        }
    }, [query, cachedQuery]);

    useEffect(() =>
    {
        if (!isNaN(itemId))
        {
            setItemData(undefined);

            const web = resolveWeb(cachedQuery);
            const list = resolveList(web, cachedQuery);
            const item = list.items.getById(itemId);
            const itemQuery = insertODataQuery(item, cachedQuery);

            itemQuery.get()
                .then(data => setItemData(data))
                .catch(err =>
                {
                    console.error(err);
                    setItemData(undefined);
                });
        }
    }, [cachedQuery, itemId]);

    return itemData;
}

/**
 * Deep equality check for list item query
 */
const _areEqual = (left: ListItemQuery, right: ListItemQuery) =>
    left !== undefined
    && right !== undefined
    && right.list === left.list
    && right.web === left.web
    && AreEqual(left.select, right.select)
    && AreEqual(left.expand, right.expand);
