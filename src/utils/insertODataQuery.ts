import { _SharePointQueryableCollection, _SharePointQueryableInstance } from "@pnp/sp/sharepointqueryable";
import { Nullable } from "../types";
import { ODataQueryable, ODataQueryableCollection } from "../types/ODataQueryable";

type SharepointQueryable = _SharePointQueryableInstance | _SharePointQueryableCollection;
type ODataQuery = Partial<ODataQueryableCollection & ODataQueryable>;

export function insertODataQuery<T extends _SharePointQueryableInstance>(instance: T, query: Nullable<Partial<ODataQueryable>>): T;
export function insertODataQuery<T extends _SharePointQueryableCollection>(instance: T, query: Nullable<ODataQuery>): T;
export function insertODataQuery<T extends SharepointQueryable>(instance: T, query: Nullable<ODataQuery>): T
{
    let _instance: SharepointQueryable = instance;

    if (!query)
    {
        return instance as T;
    }

    if (_isQueryableCollection(_instance))
    {
        if (query.skip)
        {
            _instance = _instance.skip(query.skip);
        }

        if (query.orderBy)
        {
            _instance = _instance.orderBy(query.orderBy, query.orderyByAscending);
        }

        if (query.top)
        {
            _instance = _instance.top(query.top);
        }
    }

    if (query.expand && query.expand.length > 0)
    {
        _instance = _instance.expand(...query.expand);
    }

    if (query.select && query.select.length > 0)
    {
        _instance = _instance.select(...query.select);
    }

    return _instance as T;
}

function _isQueryableCollection(instance: SharepointQueryable): instance is _SharePointQueryableCollection
{
    const queryableCollection = instance as _SharePointQueryableCollection;

    return queryableCollection.skip !== undefined
        && queryableCollection.orderBy !== undefined
        && queryableCollection.top !== undefined;

}