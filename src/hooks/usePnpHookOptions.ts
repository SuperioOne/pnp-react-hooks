import { useContext } from "react";
import { InternalContext } from "../context";
import { PnpHookGlobalOptions } from "../types/options";

/**
 * Returns nearest provider's context.
 */
export function usePnpHookOptions() : Readonly<PnpHookGlobalOptions>
{
    return useContext(InternalContext);
}