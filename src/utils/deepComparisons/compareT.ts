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
    else if (leftType && rightType)
    {
        return comparisonFunc(left, right);
    }
    else
    {
        return true;
    }
}