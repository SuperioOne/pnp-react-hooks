type CompareFunc<T> = (left: T, right: T) => boolean;
type TypeGuardFunc<T> = (obj: unknown) => obj is T;

export function compare<T>(left: unknown, right: unknown, comparisonFunc: CompareFunc<T>, typeGuard: TypeGuardFunc<T>)
{
    const leftType = typeGuard(left);
    const rightType = typeGuard(right);

    if (leftType !== rightType)
    {
        return false;
    }
    else if (true === leftType === rightType)
    {
        // typescript can't detect cached typeGuards. Enforce type with type casting (doesn't have any impact on compiled code)
        return comparisonFunc(left as T, right as T);
    }
    else
    {
        return true;
    }
}