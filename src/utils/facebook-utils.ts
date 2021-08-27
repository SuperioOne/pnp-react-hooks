// function is(x: any, y: any)
// {
//     return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
//         ;
// }

export const objectIs = Object.is;

export const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

export function shallowEqual(objA?: Record<string, unknown>, objB?: Record<string, unknown>)
{
    if (objectIs(objA, objB))
    {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null)
    {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length)
    {
        return false;
    } // Test for A's keys different from B.


    for (let i = 0; i < keysA.length; i++)
    {
        if (!hasOwnProperty.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]]))
        {
            return false;
        }
    }

    return true;
}

export function areHookInputsEqual(nextDeps?: readonly unknown[], prevDeps?: readonly unknown[])
{

    if (prevDeps === nextDeps)
    {
        return true;
    }

    if (nextDeps === undefined || prevDeps === undefined || nextDeps.length !== prevDeps.length)
    {
        return false;
    }
    else
    {
        for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++)
        {
            if (objectIs(nextDeps[i], prevDeps[i]))
            {
                continue;
            }

            return false;
        }

        return true;
    }
}
