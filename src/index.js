export * from "./sp/index.js";
export * from "./behaviors/index.js";
export * from "./context/index.js";
export * from "./errors/index.js";

/** @type{{Default: 0; Suppress:1}} **/
export const ErrorMode = {
  /**
   * Throws error to upper level without any handling
   */
  Default: 0,

  /**
   * Do not emit any error
   */
  Suppress: 1,
};
