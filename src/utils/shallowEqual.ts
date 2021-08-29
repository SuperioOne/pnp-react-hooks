// react-reconciler shallowEqual implementation.

// Pollyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function is(x: any, y: any)
{
    if (x === y)
    {
        return x !== 0 || 1 / x === 1 / y;
    }
    else
    {
        return x !== x && y !== y;
    }
}

const objectIs = Object.is ? Object.is : is;

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function shallowEqual(objA?: Readonly<Record<string, unknown>>, objB?: Readonly<Record<string, unknown>>)
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
    }

    for (let i = 0; i < keysA.length; i++)
    {
        if (!hasOwnProperty.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]]))
        {
            return false;
        }
    }

    return true;
}
