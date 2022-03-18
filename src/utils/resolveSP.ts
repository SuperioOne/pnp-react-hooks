import { TimelinePipe } from "@pnp/core";
import { _PnpHookOptions } from "../types/options";
import { assert } from "./assert";
import { spfi, SPFI } from "@pnp/sp";

export function resolveSP(options: _PnpHookOptions<unknown>, behaviors?: TimelinePipe[]): SPFI
{
    assert(options.sp instanceof SPFI, "SP context is not valid");

    let newBehaviors: TimelinePipe[] = [];

    // user provided behaviors
    if (options.behaviors && options.behaviors.length > 0)
    {
        newBehaviors = options.behaviors;
    }

    // internal behaviors
    if (behaviors && behaviors.length > 0)
    {
        newBehaviors = newBehaviors.concat(behaviors);
    }

    return newBehaviors.length > 0 ?
        spfi(options.sp).using(...newBehaviors)
        : options.sp;
}