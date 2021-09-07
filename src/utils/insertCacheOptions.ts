import { CacheOptions, Nullable, SharepointQueryable } from "../types";

export function insertCacheOptions<T extends SharepointQueryable>(instance: T, options: Nullable<CacheOptions>): SharepointQueryable
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