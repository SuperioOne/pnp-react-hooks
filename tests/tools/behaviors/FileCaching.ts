/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheMode } from "../../test.config";
import { FileCacheStorage } from "../FileCacheStorage";
import { IQueryableInternal } from "@pnp/queryable/queryable";
import { LogLevel } from "@pnp/logging";
import { Queryable } from "@pnp/queryable";
import { TimelinePipe } from "@pnp/core";

export interface FileCachingOptions
{
    cacheDir: string;
    cacheMode: CacheMode;
}

export function FileCaching(props: FileCachingOptions): TimelinePipe<Queryable>
{
    const storage = new FileCacheStorage(props.cacheDir);

    return (instance: Queryable) =>
    {
        if (props.cacheMode === "disabled")
            return instance;

        instance.on.pre(async function (this: IQueryableInternal, url: string, init: RequestInit, result: any): Promise<[string, RequestInit, any]>
        {
            const cachePath = storage.getCachePath(url, init);
            const cached = await storage.loadFromCache(cachePath);

            if (cached === null && props.cacheMode === "ifExists")
            {
                this.on.post(async function (url: URL, result: any)
                {
                    await storage.saveToCache(url.toString(), init, result);
                    return [url, result];
                });
            }
            else
            {
                this.log("Using cached result.", LogLevel.Verbose);
                result = cached;
            }

            return [url, init, result];
        });

        return instance;
    };
}