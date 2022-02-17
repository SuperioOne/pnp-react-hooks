import "@pnp/sp/folders";
import { IWeb } from "@pnp/sp/webs/types";
import { isUUID } from "./isUUID";
import { isUrl, UrlType } from "./isUrl";

export function resolveFolder(web: IWeb, folderId: string)
{
    if (isUUID(folderId))
    {
        return web.getFolderById(folderId);
    }
    else if (isUrl(folderId, UrlType.Relative))
    {
        return web.getFolderByServerRelativePath(folderId);
    }
    else
    {
        throw new TypeError("folderId is not a valid type");
    }
}