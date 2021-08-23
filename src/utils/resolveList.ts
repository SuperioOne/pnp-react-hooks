import type { IWeb } from "@pnp/sp/webs/types";
import type { ListQuery } from "../types/ListQuery";

export function resolveList(web: IWeb, query: ListQuery)
{
    return typeof query.list === "string"
        ? web.lists.getByTitle(query.list)
        : web.lists.getById(query.list.toString());
}