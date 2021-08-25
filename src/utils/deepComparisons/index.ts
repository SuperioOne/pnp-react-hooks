import type { ListQuery, ODataQueryable, ODataQueryableCollection, SPQuery } from "../../types";
import { Compare } from "./compareFunction";
import { compareListQuery } from "./compareListQuery";
import { compareODataQueryable } from "./compareODataQueryable";
import { compareODataQueryableCollection } from "./compareODataQueryableCollection";
import { compareSPQuery } from "./compareSPQuery";
import { isListQuery, isODataQueryable, isODataQueryableCollection, isSPQuery } from "../../types/typeGuards";

export default function deepCompareQuery(left: unknown, right: unknown)
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
