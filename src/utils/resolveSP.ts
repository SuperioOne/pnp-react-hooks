import { AssignFrom } from "@pnp/core";
import { ContextOptions } from "../types/options";
import { SPFI, spfi } from "@pnp/sp";
import { assert } from "./assert";
import { isUrl, UrlType } from "./isUrl";

export function resolveSP(query: ContextOptions): SPFI
{
    if (query.web === undefined)
    {
        return query.sp;
    }
    else
    {
        assert(isUrl(query.web, UrlType.Absolute),
            "Web parameter is not an absolute url.");

        return spfi(query.web).using(AssignFrom(query.sp.web));
    }
}