import type { IWeb } from "@pnp/sp/webs/types";
import type { ListByIdQuery, ListByTitleQuery } from "../types/ListQuery";
import { isListByIdQuery } from "./isListByIdQuery";

export function resolveList(web: IWeb, query: ListByIdQuery | ListByTitleQuery)
{
    return isListByIdQuery(query)
        ? web.lists.getById(query.listId)
        : web.lists.getByTitle(query.listTitle);
}