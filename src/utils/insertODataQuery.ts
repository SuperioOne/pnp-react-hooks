import { _SharePointQueryableCollection } from "@pnp/sp/sharepointqueryable";
import { Nullable, ODataQueryableCollection, SharepointQueryable } from "../types";

export function insertODataQuery(instance: Readonly<SharepointQueryable>, query: Nullable<ODataQueryableCollection>)
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

        if (query.filter)
        {
            instance.filter(query.filter);
        }
    }

    if (query.expand && query.expand.length > 0)
    {
        instance = instance.expand(...query.expand);
    }

    if (query.select && query.select.length > 0)
    {
        instance = instance.select(...query.select);
    }

    return instance;
}

function _isQueryableCollection(instance: Readonly<SharepointQueryable>): instance is _SharePointQueryableCollection
{
    const queryableCollection = instance as _SharePointQueryableCollection;

    return queryableCollection.skip !== undefined
        && queryableCollection.orderBy !== undefined
        && queryableCollection.top !== undefined
        && queryableCollection.filter !== undefined;
}