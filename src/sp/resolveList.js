import "@pnp/sp/lists";
import { assertString } from "../utils/assert.js";
import { isUUID } from "../utils/is.js";

/**
 * Resolves SP list by either title or list uuid.
 * @param {import('@pnp/sp/webs/types.js').IWeb} web - SP web instance.
 * @param {string} listId - folder server relative path or folder uuid.
 * @throws {import('../errors/AssertError.js').AssertError} - Throws when listId format is not valid.
 * @returns {import('@pnp/sp/lists/types.js').IList} - SP Folder instance.
 */
export function resolveList(web, listId) {
  assertString(listId, "List value is not valid.");

  return isUUID(listId)
    ? web.lists.getById(listId)
    : web.lists.getByTitle(listId);
}
