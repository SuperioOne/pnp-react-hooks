import { ListQuery } from "../types";
import { IWeb } from "@pnp/sp/webs/types";

export function resolveList(web: IWeb, query: ListQuery)
{
    return typeof query.list === "string"
        ? web.lists.getByTitle(query.list)
        : web.lists.getById(query.list.toString());
}