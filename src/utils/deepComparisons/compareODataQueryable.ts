import { compareArray } from "../compareArray";
import { ODataQueryable } from "../../types/ODataQueryable";

export function compareODataQueryable(left?: ODataQueryable, right?: ODataQueryable)
{
    return left === right || (compareArray(left?.select, right?.select) && compareArray(left?.expand, right?.expand));
}
