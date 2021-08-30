import { ODataQueryable, ODataQueryableCollection } from "./ODataQueryable";

export function isODataQueryable(obj: unknown): obj is ODataQueryable
{
    return obj !== undefined
        && (
            Array.isArray((obj as ODataQueryable).select)
            || Array.isArray((obj as ODataQueryable).expand)
        );
}

export function isODataQueryableCollection(obj: unknown): obj is ODataQueryableCollection
{
    return obj !== undefined
        && (
            (typeof (obj as ODataQueryableCollection).orderBy) === "string"
            || (typeof (obj as ODataQueryableCollection).orderyByAscending) === "boolean"
            || (typeof (obj as ODataQueryableCollection).skip) === "number"
            || (typeof (obj as ODataQueryableCollection).top) === "number"
        );
}
