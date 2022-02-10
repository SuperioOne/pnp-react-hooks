import { Nullable } from "../types/utilityTypes";

/**
 * Null or undefined value type assertion.
 * @param value 
 * @returns Returns true if value is undefined or null.
 */
export function isNull<T>(value: Nullable<T>): value is undefined | null
{
    return value === undefined || value === null;
}