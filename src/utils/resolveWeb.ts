import { sp } from "@pnp/sp";
import { Nullable, WebOptions } from "../types";
import { IWeb, Web } from "@pnp/sp/webs";
import { isUrl, UrlType } from "./isUrl";
import { assert } from "./assert";

export function resolveWeb(query: Nullable<WebOptions>): IWeb
{
    let web: IWeb;

    if (query?.web === undefined)
    {
        web = sp.web;
    }
    else if (typeof query?.web === "string")
    {
        assert(isUrl(query.web, UrlType.Absolute),
            "Web parameter is not an absolute url.");

        web = Web(query.web);
    }
    else
    {
        web = query.web;
    }

    return web;
}