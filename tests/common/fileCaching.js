import * as crypto from "node:crypto";
import * as path from "node:path";
import * as fs from "node:fs";
import * as fsAsync from "node:fs/promises";
import { Queryable } from "@pnp/queryable";
import { LogLevel } from "@pnp/logging";

/**
 * @typedef FileCacheOptions
 * @property {string} cacheDir
 * @property {string} mode
 */
class FileCacheStorage {
  /**  @type{string} **/
  cacheDir;

  constructor(/** @type{string} **/ cacheDir) {
    this.cacheDir = cacheDir;
  }

  /**
   * @param {string} url
   * @param {RequestInit} init
   */
  getCachePath(url, init) {
    const sha256 = crypto.createHash("sha256");

    sha256.update(url);
    sha256.update(init.method ?? "GET");
    sha256.update(JSON.stringify(init.body) ?? "undefined");
    sha256.update(init.headers?.["Accept"] ?? "undefined");

    const hash = sha256.digest("hex");

    return path.join(this.cacheDir, `${hash}.json`);
  }

  /**
   * @param {string} path
   * @returns {boolean}
   */
  hasCachePath(path) {
    return fs.existsSync(path);
  }

  /**
   * @param {string} url
   * @param {RequestInit} init
   * @param {any} result
   * @returns {Promise<void>}
   */
  saveToCache(url, init, result) {
    const path = this.getCachePath(url, init);
    return fsAsync.writeFile(
      path,
      JSON.stringify(
        {
          url: url,
          method: init.method,
          headers: {
            Accept: init.headers?.["Accept"] ?? "application/json",
          },
          requestBody: init.body,
          body: result,
        },
        undefined,
        2,
      ),
    );
  }

  /**
   *  @param {string} path
   *  @returns {Promise<any>}
   */
  async loadFromCache(path) {
    const isExist = fs.existsSync(path);

    if (!isExist) {
      return null;
    }

    const cachedRes = await fsAsync.readFile(path, { encoding: "utf8" });
    return JSON.parse(cachedRes)?.body;
  }
}

/**
 * @param {FileCacheOptions} props
 * @returns {import("@pnp/core").TimelinePipe<Queryable>}
 *
 */

export function FileCaching(props) {
  const storage = new FileCacheStorage(props.cacheDir);

  return (instance) => {
    if (props.mode === "disabled") return instance;

    instance.on.pre(async function (url, init, result) {
      const cachePath = storage.getCachePath(url, init);
      const cached = await storage.loadFromCache(cachePath);

      if (cached === null && props.mode === "ifExists") {
        this.on.post(
          async function (/** @type{URL} **/ url, /** @type{any} **/ result) {
            await storage.saveToCache(url.toString(), init, result);
            return [url, result];
          },
        );
      } else {
        this.log("Using cached result.", LogLevel.Verbose);
        result = cached;
      }

      return [url, init, result];
    });

    return instance;
  };
}
