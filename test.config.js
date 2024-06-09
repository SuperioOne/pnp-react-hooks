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
  logResponse: true,
  cacheMode: "ifExists",
  cacheDir: "./.temp/requestCache",
  retries: 3,
  retryInterval: 5000,
};
