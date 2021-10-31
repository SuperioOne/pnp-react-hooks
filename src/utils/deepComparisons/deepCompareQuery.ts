import { isODataQueryableCollection, isODataQueryable } from "../typeGuards";
import { compareODataQueryableCollection } from "./compareODataQueryableCollection";
import { compareODataQueryable } from "./compareODataQueryable";
import { compare } from "./compareT";
import { ODataQueryable, ODataQueryableCollection } from "../../types/ODataQueryable";
import { Nullable } from "../../types/utilityTypes";

export function deepCompareQuery<T>(left: Nullable<T>, right: Nullable<T>)
{
    return left === right
        || (
            left
            && right
            && compare<ODataQueryableCollection>(left, right, compareODataQueryableCollection, isODataQueryableCollection)
            && compare<ODataQueryable>(left, right, compareODataQueryable, isODataQueryable)
        );
}
