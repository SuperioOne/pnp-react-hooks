import { Guid } from "../utils";
import { ListQuery } from "./ListQuery";
import { ODataQueryable, ODataQueryableCollection } from "./ODataQueryable";
import { SPQuery } from "./SPQuery";

export function isListQuery(obj: unknown): obj is ListQuery
{
    return obj !== undefined
        && (
            typeof (obj as ListQuery).list === "string"
            || ((obj as ListQuery).list as Guid).value !== undefined
        );
}

export function isSPQuery(obj: unknown): obj is SPQuery
{
    return obj !== undefined
        && (
            typeof (obj as SPQuery).web === "string"
            || typeof (obj as SPQuery).web === "object"
        );
}

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
