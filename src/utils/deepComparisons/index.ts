import { ODataQueryableCollection, ODataQueryable, Nullable } from "../../types";
import { compare } from "./compareT";
import { compareODataQueryable } from "./compareODataQueryable";
import { compareODataQueryableCollection } from "./compareODataQueryableCollection";
import { isODataQueryableCollection, isODataQueryable } from "../../types/typeGuards";

export default function deepCompareQuery<T extends Record<string, unknown>>(left: Nullable<T>, right: Nullable<T>)
{
    return left === right
        || (
            left 
            && right
            && compare<ODataQueryableCollection>(left, right, compareODataQueryableCollection, isODataQueryableCollection)
            && compare<ODataQueryable>(left, right, compareODataQueryable, isODataQueryable)
        );
}