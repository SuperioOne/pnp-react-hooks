import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import { assertID } from "../utils/assert";
import { resolveList } from "./resolveList";

/**
 * @template {string | undefined} TList
 * @template {number | undefined} TItem
 * @param {import('@pnp/sp/webs/types').IWeb} web
 * @param {TList} list
 * @param {TItem} item
 * @throws {TypeError | import('../errors/AssertError').AssertError} Throws when list or item identifiers are not valid.
 * @returns {import('./types.private').ScopeReturnType<TList, TItem>}
 */
export function resolveScope(web, list, item) {
  if (list) {
    const scope = resolveList(web, list);

    if (item !== undefined) {
      assertID(item, "Can't get item scope. ID is undefined or negative.");
      // @ts-ignore
      return scope.items.getById(item);
    }

    // @ts-ignore
    return scope;
  } else if (item !== undefined) {
    throw new TypeError("Item Id is defined but list Id isn't provided.");
  } else {
    // @ts-ignore
    return web;
  }
}
