/**
 * Deep comparisons between two arrays.
 * @returns true if contents are equal, otherwise false.
 * @example
 * compareArray([1,2,3,4,5], [5,4,2,1,3]) // true
 * compareArray([1,2,3,4,5], [5,4,2,"1",3]) // false
 */
export function compareArray(left?: readonly unknown[], right?: readonly unknown[]): boolean
{
    // same reference
    if (left === right)
    {
        return true;
    }
    // different lenght
    else if (left?.length !== right?.length)
    {
        return false;
    }
    // both are empty 
    else if ((left?.length ?? 0) === 0 && (right?.length ?? 0) === 0)
    {
        return true;
    }
    // sorts and checks element by element
    else
    {
        const sortedLeft = left?.slice().sort();
        const sortedRight = right?.slice().sort();

        return sortedLeft.every((value, index) => value === sortedRight[index]);
    }
}