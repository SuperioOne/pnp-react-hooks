import { sp } from "@pnp/sp";
import { isURL, UrlType } from "./isURL";
import { assert } from "./assert";
import { WebOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";
import { IWeb, Web } from "@pnp/sp/webs";

export function resolveWeb(query: Nullable<WebOptions>): IWeb
{
    let web: IWeb;

    if (query?.web === undefined)
    {
        web = sp.web;
    }
    else if (typeof query?.web === "string")
    {
        assert(isURL(query.web, UrlType.Absolute),
            "Web parameter is not an absolute url.");

        web = Web(query.web);
    }
    else
    {
        web = query.web;
    }

    return web;
}