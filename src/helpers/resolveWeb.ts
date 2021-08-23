import type { IWeb } from "@pnp/sp/webs";
import type { SPQuery } from "../types/SPQuery";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";

export function resolveWeb(query: SPQuery): IWeb
{
    let web: IWeb;

    if (typeof query.web === "string")
    {
        web = Web(query.web);
    }
    else if (typeof query.web === undefined)
    {
        web = sp.web;
    }
    else
    {
        web = query.web;
    }

    return web;
}