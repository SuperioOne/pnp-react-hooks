import { createElement } from "react";
import { PnpHookOptionProvider } from "./pnpHookOptionProvider.js";

/**
 * @param {import('../types.js').PnpHookGlobalOptions} contextOptions
 * @param {...Array<import("react").ReactNode>} children
 * @returns { React.FunctionComponentElement<{
 *      value: import('../types.js').PnpHookGlobalOptions;
 *      children?: any; }>
 *  }
 */
export function createProviderElement(contextOptions, ...children) {
  return createElement(
    PnpHookOptionProvider,
    { value: contextOptions },
    ...children,
  );
}
