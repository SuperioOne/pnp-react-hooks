import { createElement } from "react";
import { PnpHookOptionProvider } from "./PnpHookOptionProvider";
import { PnpHookGlobalOptions } from "../types/options";

export function createProviderElement(contextOptions: PnpHookGlobalOptions, ...children: React.ReactNode[])
{
    return createElement(PnpHookOptionProvider, { value: contextOptions }, ...children);
}