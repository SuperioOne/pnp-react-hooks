import { useContext } from "react";
import { InternalContext } from "../context";

/**
 * Returns nearest provider's context.
 * @returns {Readonly<import("../types").PnpHookGlobalOptions>}
 */
export function usePnpHookOptions() {
  return useContext(InternalContext);
}
