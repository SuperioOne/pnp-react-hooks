import "@pnp/sp/site-groups";
import { IWeb } from "@pnp/sp/webs/types";
import { assertID, assertString } from "./assert";

export function resolveGroup(web: IWeb, groupId: string | number)
{
    switch (typeof groupId)
    {
        case "number":
            {
                assertID(groupId, "groupId is not a valid ID.");
                return web.siteGroups.getById(groupId);
            }
        case "string":
            {
                assertString(groupId, "groupId is not a valid name.");
                return web.siteGroups.getByName(groupId);
            }
        default:
            throw new TypeError("groupId type is not number or string.");
    }
}