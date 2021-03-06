import { Nullable } from "../types/utilityTypes";
import { assert } from "./assert";

/**
 * Deep comparisons between two **sorted** arrays or tuples.
 * @returns true if contents are equal, otherwise false.
 * @example
 *
 * compareTuples([1,2,3,4,5], [5,4,2,1,3]) // false
 * compareTuples([1,2,3,4,5], [5,4,2,"1",3]) // false
 * compareTuples([1,2,3,4,5], [1,2,3,4,5]) // true
 */
export function compareTuples(left: Readonly<Nullable<unknown[]>>, right: Readonly<Nullable<unknown[]>>): boolean
{
    if (left === right)
    {
        return true;
    }

    if (!left || !right)
    {
        return false;
    }

    assert(left.length === right.length, "Tuple lengths are not same.");

    for (let index = 0; index < left.length; index++)
    {
        if (Object.is(left[index], right[index]))
        {
            continue;
        }

        return false;
    }

    return true;
}
