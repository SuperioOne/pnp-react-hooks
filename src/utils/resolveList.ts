import "@pnp/sp/lists";
import { IWeb } from "@pnp/sp/webs/types";
import { assertString } from "./assert";
import { isUUID } from "./is";

export function resolveList(web: IWeb, list: string) {
  assertString(list, "List value is not valid.");

  const isGuid = isUUID(list);

  return isGuid ? web.lists.getById(list) : web.lists.getByTitle(list);
}

