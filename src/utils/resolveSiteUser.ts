import { IWeb } from "@pnp/sp/webs/types";
import { ParameterError } from "../errors/ParameterError";
import { isEmail } from "./isEmail";

export function resolveSiteUser(web: IWeb, userIdentifier: string)
{
    switch (typeof userIdentifier)
    {
        case "number":
            {
                return web.siteUsers.getById(userIdentifier);
            }
        case "string":
            {
                return isEmail(userIdentifier)
                    ? web.siteUsers.getByEmail(userIdentifier)
                    : web.siteUsers.getByLoginName(userIdentifier);
            }
        default:
            throw new ParameterError("resolveUser: userIdentifier value is not valid.", "userIdentifier", userIdentifier);
    }
}