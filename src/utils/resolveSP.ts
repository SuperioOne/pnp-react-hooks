import { _PnpHookOptions } from "../types/options";
import { spfi, SPFI } from "@pnp/sp";
import { assert } from "./assert";

export function resolveSP(options: _PnpHookOptions<unknown>): SPFI
{
    assert(options.sp instanceof SPFI, "SP context is not valid");

    return options.behaviors
        ? spfi(options.sp).using(...options.behaviors)
        : options.sp;
}