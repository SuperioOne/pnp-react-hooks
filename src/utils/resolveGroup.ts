import "@pnp/sp/site-groups";
import { IWeb } from "@pnp/sp/webs/types";

export function resolveGroup(web: IWeb, groupIdentifier: string | number)
{
    return typeof groupIdentifier === "number"
        ? web.siteGroups.getById(groupIdentifier)
        : web.siteGroups.getByName(groupIdentifier);
}