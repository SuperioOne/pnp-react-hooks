import { Nullable } from "../types/utilityTypes";
import { ODataQueryable, ODataQueryableCollection } from "../types/ODataQueryable";
import { compareArray } from "./compareArray";
import { isNull } from "./isNull";
import { _PnpHookOptions } from "../types/options";
import { compareURL } from "./compareURL";
import { shallowEqual } from "./shallowEqual";

export function deepCompareOptions(prev: Nullable<_PnpHookOptions>, current: Nullable<_PnpHookOptions>)
{
    return prev === current
        || (
            deepCompareQuery(prev?.query, current?.query)
            && (prev?.web === current?.web || (typeof prev?.web === "string" && typeof current?.web === "string" && compareURL(prev.web, current.web)))
            && shallowEqual(prev?.sp, current?.web)
        );
}

export function deepCompareQuery<T extends ODataQueryable | ODataQueryableCollection>(left: Nullable<T>, right: Nullable<T>)
{
    return left === right
        || (
            !isNull(left)
            && !isNull(right)
            && _compareODataQueryable(left, right)
        );
}

type _ODataQuery = ODataQueryable & ODataQueryableCollection;

function _compareODataQueryable(left: _ODataQuery, right: _ODataQuery)
{
    return left.filter === right.filter
        && left.top === right.top
        && left.orderBy === right.orderBy
        && left.orderyByAscending === right.orderyByAscending
        && left.skip === right.skip
        && compareArray(left.select, right.select)
        && compareArray(left.expand, right.expand);
}