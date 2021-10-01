import "@pnp/sp/lists";
import { IWeb } from "@pnp/sp/webs/types";
import { assert } from "./assert";
import { isUUID } from "./isUUID";

export function resolveList(web: IWeb, list: string)
{
    assert(typeof list === "string" && list.trim().length > 0,
        "List value is not valid.");

    const isGuid = isUUID(list);

    return isGuid
        ? web.lists.getById(list)
        : web.lists.getByTitle(list);
}