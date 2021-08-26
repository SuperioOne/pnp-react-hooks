/**
 * Deep comparisons between two arrays.
 * @returns true if contents are equal, otherwise false.
 * @example
 * compareArray([1,2,3,4,5], [5,4,2,1,3]) // true
 * compareArray([1,2,3,4,5], [5,4,2,"1",3]) // false
 */
export function compareArray(left?: readonly unknown[], right?: readonly unknown[]): boolean
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
    // different length or one of them are undefined
    else if (left === undefined || right === undefined || leftLength !== rightLength)
    {
        return false;
    }
    // sorts and checks element by element
    else
    {
        const sortedLeft = left.slice().sort();
        const sortedRight = right.slice().sort();

        return sortedLeft.every((value, index) => value === sortedRight[index]);
    }
}