import "@pnp/sp/lists";
import { assertString } from "../utils/assert";
import { isUUID } from "../utils/is";

/**
 * Resolves SP list by either title or list uuid.
 * @param {import('@pnp/sp/webs/types').IWeb} web - SP web instance.
 * @param {string} listId - folder server relative path or folder uuid.
 * @throws {import('../errors/AssertError').AssertError} - Throws when listId format is not valid.
 * @returns {import('@pnp/sp/lists/types').IList} - SP Folder instance.
 */
export function resolveList(web, listId) {
  assertString(listId, "List value is not valid.");

  return isUUID(listId)
    ? web.lists.getById(listId)
    : web.lists.getByTitle(listId);
}
