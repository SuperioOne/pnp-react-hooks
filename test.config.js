/**
 * @typedef TestConfig
 * @property {boolean} logResponse
 * @property {"ifExists" | "cacheOnly" | "disabled"} cacheMode
 * @property {string} cacheDir
 * @property {number} retries
 * @property {number} retryInterval
 */

/** @type{TestConfig} **/
export default {
  cacheMode: "ifExists",
  cacheDir: "./node_modules/.prh_cache/requestCache",
  retries: 3,
  retryInterval: 2000,
  logResponse: true,
};
