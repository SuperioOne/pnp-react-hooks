import { ListQuery } from "../../types/ListQuery";
import type { SPQuery } from "../../types/SPQuery";

export function compareSPQuery(left?: SPQuery, right?: SPQuery)
{
    return left === right || left?.web === right?.web;
}

export function compareListQuery(left?: ListQuery, right?: ListQuery)
{
    if (left === right || left?.list === right?.list)
    {
        return true;
    }
    else
    {
        if (typeof left.list === "object" && typeof left.list === "object")
        {
            return left.list.value === left.list.value;
        }
        else
        {
            return false;
        }
    }
}