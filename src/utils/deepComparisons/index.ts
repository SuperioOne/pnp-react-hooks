import type { SPQuery, ODataQueryableCollection, ODataQueryable, ListQuery } from "../../types";
import { compare } from "./compareT";
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
            && compare<ListQuery>(left, right, compareListQuery, isListQuery)
            && compare<SPQuery>(left, right, compareSPQuery, isSPQuery)
            && compare<ODataQueryableCollection>(left, right, compareODataQueryableCollection, isODataQueryableCollection)
            && compare<ODataQueryable>(left, right, compareODataQueryable, isODataQueryable)
        );
}