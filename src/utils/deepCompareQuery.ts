import { Nullable } from "../types/utilityTypes";
import { ODataQueryable, ODataQueryableCollection } from "../types/ODataQueryable";
import { compareArray } from "./compareArray";
import { isNullOrEmpty } from "./isNullOrEmpty";

export function deepCompareQuery<T extends ODataQueryable | ODataQueryableCollection>(left: Nullable<T>, right: Nullable<T>)
{
    return left === right
        || (
            !isNullOrEmpty(left)
            && !isNullOrEmpty(right)
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