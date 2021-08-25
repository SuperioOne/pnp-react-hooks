import type { ListQuery } from "../../types";

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