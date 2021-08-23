import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import type { ListByIdQuery, ListByTitleQuery } from "../types/ListQuery";
import type { ODataQueryable } from "../types/ODataQueryable";
import type { SPQuery } from "../types/SPQuery";
import { AreEqual } from "../helpers/arrayEquality";
import { insertODataQuery } from "../helpers/insertODataQuery";
import { resolveList } from "../helpers/resolveList";
import { resolveWeb } from "../helpers/resolveWeb";
import { useEffect, useState } from "react";

export interface ListIdItemQuery extends ODataQueryable, ListByIdQuery, SPQuery { }
export interface ListTitleItemQuery extends ODataQueryable, ListByTitleQuery, SPQuery { }

type ListItemQuery = ListIdItemQuery | ListTitleItemQuery;

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
 * Deep equality check
 */
const _areEqual = (left: ListItemQuery, right: ListItemQuery) => left === right
    || (left !== undefined
        && AreEqual(left.select, right.select)
        && AreEqual(left.expand, right.expand));
