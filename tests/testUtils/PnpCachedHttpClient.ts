/* eslint-disable @typescript-eslint/no-explicit-any */

import * as crypto from "crypto";
import * as fse from "fs-extra";
import * as path from "path";
import { Configuration } from "@azure/msal-node";
import { IFetchOptions } from "@pnp/common";
import { MsalFetchClient } from "@pnp/nodejs";
import { default as fetch, Response, Headers } from "node-fetch";

import
{
    objectDefinedNotNull,
    assign,
} from "@pnp/common";

const HIGHWATERMARK = 1024 * 1024 * 5; // 5 MB
const JSON_REGEX = /application\/json/i;

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

    // https://github.com/node-fetch/node-fetch#custom-highwatermark
    // use node-fetch v3 instead of v2 to prevent highwatermark limitation when copying body streams.
    public override async fetch(url: string, options: any): Promise<any>
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
            // https://github.com/pnp/pnpjs/blob/version-2/packages/nodejs/net/msalfetchclient.ts
            // pnpjs msalfetch fetch implementation

            if (!objectDefinedNotNull(options))
            {
                options = {
                    headers: new Headers(),
                };
            } else if (!objectDefinedNotNull(options.headers))
            {
                options = assign(options, {
                    headers: new Headers(),
                });
            }

            const token = await this.acquireToken();

            options.headers.set("Authorization", `${token.tokenType} ${token.accessToken}`);

            const response = await fetch(
                url,
                {
                    ...options,
                    highWaterMark: HIGHWATERMARK
                });

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
        const body = await (JSON_REGEX.test(response.headers["Accept"])
            ? response.json()
            : response.text());

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

        const body = JSON_REGEX.test(cachedRes.headers["Accept"])
            ? JSON.stringify(cachedRes.body)
            : cachedRes.body;

        return new Response(body, {
            status: cachedRes.status,
            statusText: cachedRes.statusText,
            headers: new Headers(cachedRes.headers)
        });
    }
}