import { createElement } from "react";
import { PnpHookOptionProvider } from "./pnpHookOptionProvider";

/**
 * @param {import('../types').PnpHookGlobalOptions} contextOptions
 * @param {...Array<import("react").ReactNode>} children
 * @returns { React.FunctionComponentElement<{
 *      value: import('../types').PnpHookGlobalOptions;
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
