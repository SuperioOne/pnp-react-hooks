import { AssignFrom } from "@pnp/core";
import { ContextOptions } from "../types/options";
import { SPFI, spfi } from "@pnp/sp";
import { assert } from "./assert";
import { isUrl, UrlType } from "./isUrl";
import { BehaviourOptions } from "../types/options/BehaviourOptions";

export function resolveSP(options: ContextOptions & BehaviourOptions): SPFI
{
    let sp: SPFI;

    if (options.web === undefined)
    {
        sp = options.sp;
    }
    else
    {
        assert(isUrl(options.web, UrlType.Absolute),
            "Web parameter is not an absolute url.");

        sp = spfi(options.web).using(AssignFrom(options.sp.web));
    }

    if(options.behaviors)
    {
        sp = sp.using(...options.behaviors);
    }

    return sp;
}