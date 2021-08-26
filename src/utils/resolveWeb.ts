import { sp } from "@pnp/sp";
import { SPQuery } from "../types";
import { IWeb, Web } from "@pnp/sp/webs";

export function resolveWeb(query?: SPQuery): IWeb
{
    let web: IWeb;

    if (query?.web === undefined)
    {
        web = sp.web;
    }
    else if (typeof query?.web === "string")
    {
        web = Web(query.web);
    }
    else
    {
        web = query.web;
    }

    return web;
}