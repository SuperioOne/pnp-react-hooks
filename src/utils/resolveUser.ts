import { ISiteUsers } from "@pnp/sp/site-users/types";
import { assertString, assertID } from "./assert";
import { isEmail } from "./isEmail";

export function resolveUser(users: ISiteUsers, userId: string | number)
{
    switch (typeof userId)
    {
        case "number":
            {
                assertID(userId, "userId is not valid ID.");

                return users.getById(userId);
            }
        case "string":
            {
                assertString(userId, "userId is not valid or empty string");

                return isEmail(userId)
                    ? users.getByEmail(userId)
                    : users.getByLoginName(userId);
            }
        default:
            throw new TypeError("userId value type is not string or number.");
    }
}