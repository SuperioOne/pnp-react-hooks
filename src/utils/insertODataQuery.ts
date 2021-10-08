import { _SharePointQueryableCollection } from "@pnp/sp/sharepointqueryable";
import { Nullable, ODataQueryableCollection, SharepointQueryable } from "../types";

export function insertODataQuery<T extends SharepointQueryable>(instance: T, query: Nullable<ODataQueryableCollection>): T
{
    if (!query)
    {
        return instance;
    }

    if (_isQueryableCollection(instance))
    {
        if (query.skip)
        {
            instance.skip(query.skip);
        }

        if (query.orderBy)
        {
            instance.orderBy(query.orderBy, query.orderyByAscending);
        }

        if (query.top)
        {
            instance.top(query.top);
        }
    }

    if (_isFilterable(instance) && query.filter)
    {
        instance.filter(query.filter);
    }

    if (query.expand && query.expand.length > 0)
    {
        instance.expand(...query.expand);
    }

    if (query.select && query.select.length > 0)
    {
        instance.select(...query.select);
    }

    return instance;
}

function _isQueryableCollection(instance: Readonly<SharepointQueryable>): instance is _SharePointQueryableCollection
{
    const queryableCollection = instance as _SharePointQueryableCollection;

    return typeof queryableCollection.skip === "function"
        && typeof queryableCollection.orderBy === "function"
        && typeof queryableCollection.top === "function"
        && typeof queryableCollection.filter === "function";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _isFilterable(instance: any): instance is { filter: (f: string) => unknown }
{
    return typeof instance.filter === "function";
}