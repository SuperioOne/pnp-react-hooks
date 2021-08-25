import type { ODataQueryable } from "../../types";
import { compareArray } from "../compareArray";

export function compareODataQueryable(left?: ODataQueryable, right?: ODataQueryable)
{
    return left === right || (compareArray(left?.select, right?.select) && compareArray(left?.expand, right?.expand));
}
