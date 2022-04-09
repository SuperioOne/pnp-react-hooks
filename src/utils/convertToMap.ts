/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Convert record to map object.
 */
export function convertToMap<T = any>(obj: Record<string, T>)
{
    const fields = Object.keys(obj);
    const map = new Map<string, T>();

    let key: string;
    let value: T;

    for (let index = 0; index < fields.length; index++)
    {
        key = fields[index];
        value = Reflect.get(obj, key);

        map.set(key, value);
    }

    return map;
}