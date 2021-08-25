import type { SPQuery, ODataQueryableCollection, ODataQueryable, ListQuery } from "../../types";
import { Compare } from "./compareFunction";
import { compareListQuery } from "./compareListQuery";
import { compareODataQueryable } from "./compareODataQueryable";
import { compareODataQueryableCollection } from "./compareODataQueryableCollection";
import { compareSPQuery } from "./compareSPQuery";
import { isSPQuery, isODataQueryableCollection, isODataQueryable, isListQuery } from "../../types/typeGuards";

export default function deepCompareQuery<T extends Record<string, unknown>>(left: T, right: T)
{
    return left === right
        || (
            left !== undefined
            && right !== undefined
            && Compare<ListQuery>(left, right, compareListQuery, isListQuery)
            && Compare<SPQuery>(left, right, compareSPQuery, isSPQuery)
            && Compare<ODataQueryableCollection>(left, right, compareODataQueryableCollection, isODataQueryableCollection)
            && Compare<ODataQueryable>(left, right, compareODataQueryable, isODataQueryable)
        );
}