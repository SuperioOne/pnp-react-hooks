import { ListInfo } from "../types";
import { IWeb } from "@pnp/sp/webs/types";

export function resolveList(web: IWeb, list: ListInfo)
{
    // TODO: Check if string is guid

    return typeof list === "string"
        ? web.lists.getByTitle(list)
        : web.lists.getById(list);
}