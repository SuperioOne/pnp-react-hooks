import "@pnp/sp/folders";
import { isUUID, isUrl, UrlType } from "../utils/is";

/**
 * @typedef {import('@pnp/sp/webs/types').IWeb} IWeb
 * @typedef {import('@pnp/sp/folders/types').IFolder} IFolder
 */

/**
 * Resolves SP folder by relative path or folder Id.
 * @param {IWeb} web - SP web instance.
 * @param {string} folderId - server relative path or folder uuid.
 * @throws {TypeError} - Throws when folderId format is not valid.
 * @returns {IFolder} - SP Folder instance.
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
