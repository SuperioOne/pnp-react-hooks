import { Nullable } from "../types/utilityTypes";
import { ODataQueryable, ODataQueryableCollection } from "../types/ODataQueryable";
import { compareArray } from "./compareArray";
import { isNull } from "./isNull";
import { ContextOptions, _PnpHookOptions } from "../types/options";
import { compareURL } from "./compareURL";
import { shallowEqual } from "./shallowEqual";

export function deepCompareOptions(left: Nullable<_PnpHookOptions>, right: Nullable<_PnpHookOptions>)
{
    return left === right 
    || (deepCompareQuery(left?.query, right?.query) && deepCompareContext(left, right));
}

export function deepCompareQuery<T extends ODataQueryable | ODataQueryableCollection>(left: Nullable<T>, right: Nullable<T>)
{
    return left === right
        || (
            !isNull(left)
            && !isNull(right)
            && deepCompareODataQueryable(left, right)
        );
}

type _ODataQuery = ODataQueryable & ODataQueryableCollection;

export function deepCompareODataQueryable(left: _ODataQuery, right: _ODataQuery)
{
    return left.filter === right.filter
        && left.top === right.top
        && left.orderBy === right.orderBy
        && left.orderyByAscending === right.orderyByAscending
        && left.skip === right.skip
        && compareArray(left.select, right.select)
        && compareArray(left.expand, right.expand);
}

export function deepCompareContext(left: Nullable<ContextOptions>, right: Nullable<ContextOptions>)
{
    return (left?.web === right?.web || (left?.web === "string" && typeof right?.web === "string" && compareURL(left.web, right.web)))
        && shallowEqual(left?.sp, right?.sp);
}