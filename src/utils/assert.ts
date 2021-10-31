import { AssertError } from "../errors/AssertError";
import { Nullable } from "../types/utilityTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function assert(condition: any, msg?: string): asserts condition
{
    if (!condition)
    {
        throw new AssertError(msg);
    }
}

export function assertString(str: Nullable<string>, message?: string): asserts str
{
    if (typeof str !== "string" || str.trim().length < 1)
    {
        throw new AssertError(message);
    }
}

export function assertNumber(num: Nullable<number>, message?: string): asserts num
{
    if (typeof num !== "number" || isNaN(num))
    {
        throw new AssertError(message);
    }
}

export function assertRange(num: Nullable<number>, min: number, max: number, message?: string): asserts num
{
    if (typeof num !== "number" || isNaN(num) || min > num || num > max)
    {
        throw new AssertError(message);
    }
}

export function assertMin(num: Nullable<number>, min: number, message?: string): asserts num
{
    if (typeof num !== "number" || isNaN(num) || min > num)
    {
        throw new AssertError(message);
    }
}

export function assertID(num: Nullable<number>, message?: string): asserts num
{
    if (typeof num !== "number" || isNaN(num) || num < 1)
    {
        throw new AssertError(message);
    }
}

export function assertMax(num: Nullable<number>, max: number, message?: string): asserts num
{
    if (typeof num !== "number" || isNaN(num) || num > max)
    {
        throw new AssertError(message);
    }
}