import "@pnp/sp/site-users";
import { ISiteUsers } from "@pnp/sp/site-users/types";
import { ParameterError } from "../errors/ParameterError";
import { isEmail } from "./isEmail";

export function resolveUser(users: ISiteUsers, userIdentifier: string | number)
{
    switch (typeof userIdentifier)
    {
        case "number":
            {
                return users.getById(userIdentifier);
            }
        case "string":
            {
                return isEmail(userIdentifier)
                    ? users.getByEmail(userIdentifier)
                    : users.getByLoginName(userIdentifier);
            }
        default:
            throw new ParameterError("resolveUser: userIdentifier value is not valid.", "userIdentifier", userIdentifier);
    }
}