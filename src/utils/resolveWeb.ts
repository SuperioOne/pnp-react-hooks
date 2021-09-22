import { sp } from "@pnp/sp";
import { Nullable, WebOptions } from "../types";
import { IWeb, Web } from "@pnp/sp/webs";
import { isUrl, UrlType } from "./isUrl";
import { ParameterError } from "../errors/ParameterError";

export function resolveWeb(query: Nullable<WebOptions>): IWeb
{
    let web: IWeb;

    if (query?.web === undefined)
    {
        web = sp.web;
    }
    else if (typeof query?.web === "string")
    {
        if (!isUrl(query.web, UrlType.Absolute))
            throw new ParameterError("resolveWeb: web parameter is not a absolute url.", "web", query.web);

        web = Web(query.web);
    }
    else
    {
        web = query.web;
    }

    return web;
}