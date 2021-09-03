import { CacheOptions, Nullable } from "../types";
import { ICachingOptions } from "@pnp/odata";

// Can't find proper type from pnp library, simply check for function
type Cacheable<T> = {
    usingCaching(options?: string | ICachingOptions): T;
}

export function insertCacheOptions<T extends Cacheable<T>>(instance: T, options: Nullable<CacheOptions>): T
{
    if (options?.useCache && instance.usingCaching)
    {
        return typeof options.useCache === "object"
            ? instance.usingCaching(options.useCache)
            : instance.usingCaching();
    }
    else
    {
        return instance;
    }
}