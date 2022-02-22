/* eslint-disable @typescript-eslint/no-explicit-any */
import * as crypto from "crypto";
import * as fse from "fs-extra";
import * as path from "path";

export class FileCacheStorage
{
    private readonly _cacheDir: string;

    constructor(cacheDir: string)
    {
        this._cacheDir = cacheDir;
    }

    public getCachePath(url: string, init: RequestInit)
    {
        const sha256 = crypto.createHash("sha256");

        sha256.update(url);
        sha256.update(init.method ?? "GET");
        sha256.update(JSON.stringify(init.body) ?? "undefined");
        sha256.update(init.headers?.["Accept"] ?? "undefined");

        const hash = sha256.digest("hex");

        return path.join(this._cacheDir, `${hash}.json`);
    }

    public hasCachePath(path: string)
    {
        return fse.pathExists(path);
    }

    public async saveToCache(url: string, init: RequestInit, result: any)
    {
        return fse.outputJson(
            this.getCachePath(url, init),
            {
                url: url,
                method: init.method,
                headers: {
                    "Accept": init.headers["Accept"]
                },
                requestBody: init.body,
                body: result
            },
            {
                spaces: 1,
            });
    }

    public async loadFromCache(path: string)
    {
        const isExist = await fse.pathExists(path);

        if (!isExist)
        {
            return null;
        }

        const cachedRes = await fse.readJson(path);

        return cachedRes.body;
    }
}