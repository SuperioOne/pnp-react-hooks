import { createElement } from "react";
import { PnpHookOptionProvider } from "./pnpHookOptionProvider.js";

/** @import {ReactNode} from "react" **/

/**
 * @param {import('../types.js').PnpHookGlobalOptions} contextOptions
 * @param {...ReactNode} children
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
