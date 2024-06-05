import { useContext } from "react";
import { InternalContext } from "../context/pnpHookOptionProvider.js";

/**
 * Returns nearest provider's context.
 * @returns {Readonly<import("../types.js").PnpHookGlobalOptions>}
 */
export function usePnpHookOptions() {
  return useContext(InternalContext);
}
