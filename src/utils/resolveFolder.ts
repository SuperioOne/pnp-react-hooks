import "@pnp/sp/folders";
import { IWeb } from "@pnp/sp/webs";
import { isUUID } from "./isUUID";
import { isURL, UrlType } from "./isURL";

export function resolveFolder(web: IWeb, folderId: string)
{
    if (isUUID(folderId))
    {
        return web.getFolderById(folderId);
    }
    else if (isURL(folderId, UrlType.Relative))
    {
        return web.getFolderByServerRelativeUrl(folderId);
    }
    else
    {
        throw new TypeError("folderId is not a valid type");
    }
}