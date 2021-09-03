import "@pnp/sp/lists";
import { IWeb } from "@pnp/sp/webs/types";
import isUUID from "./isUUID";

export function resolveList(web: IWeb, list: string)
{
    const isGuid = isUUID(list);

    return isGuid
        ? web.lists.getById(list)
        : web.lists.getByTitle(list);
}