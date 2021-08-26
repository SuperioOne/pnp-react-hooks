/**
 * Deep comparisons between two **sorted** arrays or known tuples.
 * @returns true if contents are equal, otherwise false.
 * @remarks use **compareArray()** instead of this version, if you don't have info about source arrays.
 * @example
 *
 * compareTuples([1,2,3,4,5], [5,4,2,1,3]) // false
 * compareTuples([1,2,3,4,5], [5,4,2,"1",3]) // false
 * compareTuples([1,2,3,4,5], [1,2,3,4,5]) // true
 */
export function compareTuples(left?: readonly unknown[], right?: readonly unknown[]): boolean
{
    const leftLength = left?.length ?? 0;
    const rightLength = right?.length ?? 0;

    // same reference
    if (left === right)
    {
        return true;
    }
    // both are empty 
    else if (leftLength === rightLength)
    {
        return true;
    }
    else if (left === undefined || right === undefined || leftLength !== rightLength)
    {
        return false;
    }
    else
    {
        return left.every((value, index) => value === right[index]);
    }
}
