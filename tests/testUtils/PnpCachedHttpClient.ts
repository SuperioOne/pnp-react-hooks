import * as crypto from "crypto";
import * as fse from "fs-extra";
import * as path from "path";
import { Configuration } from "@azure/msal-node";
import { IFetchOptions } from "@pnp/common";
import { MsalFetchClient } from "@pnp/nodejs";

export interface CacheOptions
{
    offlineOnly?: boolean;
    cacheDir: string;
}

export class PnpCachedHttpClient extends MsalFetchClient
{
    private readonly _cacheDir: string;
    private readonly _offlineOnly: boolean;

    constructor(cacheOptions: CacheOptions, config: Configuration, scopes?: string[])
    {
        super(config, scopes);

        this._cacheDir = cacheOptions.cacheDir;
        this._offlineOnly = cacheOptions.offlineOnly ?? false;
    }

    public override async fetch(url: string, options: IFetchOptions): Promise<Response>
    {
        const cachePath = this.getCachePath(url, options);

        if (await this.hasPath(cachePath))
        {
            return this.loadFromCache(cachePath);
        }
        else if (this._offlineOnly)
        {
            throw new Error(`Cache item does not exists. RequestInfo : ${JSON.stringify({
                cachePath,
                url
            }, undefined, 2)}`);
        }
        else
        {
            const response = await super.fetch(url, options);

            await this.saveToCache(cachePath, response.clone());

            return response;
        }
    }

    private getCachePath(url: string, options: IFetchOptions)
    {
        const sha256 = crypto.createHash("sha256");

        sha256.update(url);
        sha256.update(options.method ?? "GET");
        sha256.update(JSON.stringify(options.body) ?? "undefined");

        const hash = sha256.digest("hex");

        return path.join(this._cacheDir, `${hash}.json`);
    }

    private hasPath(path: string)
    {
        return fse.pathExists(path);
    }

    private async saveToCache(path: string, response: Response)
    {
        const body = await response.json();
        const headers: Record<string, string> = {};

        response.headers.forEach((val, key) => Reflect.set(headers, key, val));

        return fse.outputJson(
            path,
            {
                url: response.url,
                status: response.status,
                statusText: response.statusText,
                headers: headers,
                body: body
            },
            {
                spaces: 1,
            });
    }

    private async loadFromCache(path: string)
    {
        const cachedRes = await fse.readJson(path);

        return new Response(JSON.stringify(cachedRes.body), {
            status: cachedRes.status,
            statusText: cachedRes.statusText,
            headers: new Headers(cachedRes.headers)
        });
    }
}