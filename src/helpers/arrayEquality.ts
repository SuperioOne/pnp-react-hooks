/**
 * Deep comparisons between two arrays.
 * @returns true if contents are equal, otherwise false.
 * @example
 * AreEqual([1,2,3,4,5], [5,4,2,1,3]) // true
 * AreEqual([1,2,3,4,5], [5,4,2,"1",3]) // false
 */
export function AreEqual(left?: Array<unknown>, right?: Array<unknown>): boolean
{
    if (left === right)
    {
        return true;
    }
    else if (left?.length !== right?.length)
    {
        return false;
    }
    else
    {
        const empty = [];
        const sortedLeft = left?.slice().sort() ?? empty;
        const sortedRight = right?.slice().sort() ?? empty;

        return sortedLeft === sortedRight
            || (sortedLeft.length === sortedRight.length && sortedLeft.every((value, index) => value === sortedRight[index]));
    }
}