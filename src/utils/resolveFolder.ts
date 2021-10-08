import { IWeb } from "@pnp/sp/webs";
import { isUrl, UrlType } from "./isUrl";
import { isUUID } from "./isUUID";

export function resolveFolder(web: IWeb, folderId: string)
{
    if (isUUID(folderId))
    {
        return web.getFolderById(folderId);
    }
    else if (isUrl(folderId, UrlType.Relative))
    {
        return web.getFolderByServerRelativeUrl(folderId);
    }
    else
    {
        throw new TypeError("folderId is not a valid type");
    }
}