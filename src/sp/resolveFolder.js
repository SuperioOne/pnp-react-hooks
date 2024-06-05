import "@pnp/sp/folders";
import { isUUID, isUrl, UrlType } from "../utils/is.js";

/**
 * Resolves SP folder by either relative path or folder Id.
 * @param {import('@pnp/sp/webs/types').IWeb} web - SP web instance.
 * @param {string} folderId - folder server relative path or folder uuid.
 * @throws {TypeError} - Throws when folderId format is not valid.
 * @returns {import('@pnp/sp/folders/types').IFolder} - SP Folder instance.
 */
export function resolveFolder(web, folderId) {
  if (isUUID(folderId)) {
    return web.getFolderById(folderId);
  } else if (isUrl(folderId, UrlType.Relative)) {
    return web.getFolderByServerRelativePath(folderId);
  } else {
    throw new TypeError("folderId is not a valid type");
  }
}
