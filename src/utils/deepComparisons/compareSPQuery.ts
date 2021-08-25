import type { SPQuery } from "../../types";

export function compareSPQuery(left?: SPQuery, right?: SPQuery)
{
    return left === right || left?.web === right?.web;
}
