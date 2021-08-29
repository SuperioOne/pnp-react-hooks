/**
 * Deep comparisons between two arrays.
 * @returns true if contents are equal, otherwise false.
 * @example
 * compareArray([1,2,3,4,5], [5,4,2,1,3]) // true
 * compareArray([1,2,3,4,5], [5,4,2,"1",3]) // false
 */
export function compareArray(left?: readonly unknown[], right?: readonly unknown[]): boolean
{
    if (left === right)
    {
        return true;
    }

    if (left === undefined || right === undefined || left.length !== right.length)
    {
        return false;
    }
    else
    {
        const sortedLeft = left.slice().sort();
        const sortedRight = right.slice().sort();

        for (let index = 0; index < sortedLeft.length; index++)
        {
            if (Object.is(sortedLeft[index], sortedRight[index]))
            {
                continue;
            }

            return false;
        }

        return true;
    }
}