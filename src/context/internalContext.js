import { createContext } from "react";
import { spfi } from "@pnp/sp";
import { SPBrowser } from "@pnp/sp";

/**
 * @type {import("../types.js").PnpHookGlobalOptions}
 */
const DEFAULT_OPTIONS = {
  sp: spfi().using(SPBrowser()),
};

export const InternalContext = createContext(DEFAULT_OPTIONS);
