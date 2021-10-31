import { CacheOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";
import { SharepointQueryable } from "../types/SharepointQueryable";

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