import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { SharepointQueryable } from "../types/SharepointQueryable";
import { isFilterable, isQueryableCollection } from "./typeGuards";

export function insertODataQuery<T extends SharepointQueryable>(instance: T, query: Nullable<ODataQueryableCollection>): T
{
    if (!query)
    {
        return instance;
    }

    if (isQueryableCollection(instance))
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

    if (isFilterable(instance) && query.filter)
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