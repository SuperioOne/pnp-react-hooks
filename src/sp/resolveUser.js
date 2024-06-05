import { assertString, assertID } from "../utils/assert.js";
import { isEmail } from "../utils/is.js";

/**
 * Resolves SP user by email, user login name or user numeric Id.
 * @param {import('@pnp/sp/site-users/types.js').ISiteUsers} users -
 * @param {string | number} userId
 * @throws {TypeError} Throws when userId format is not correct.
 * @returns {import('@pnp/sp/site-users/types.js').ISiteUser} SP user instance.
 */
export function resolveUser(users, userId) {
  switch (typeof userId) {
    case "number": {
      assertID(userId, "userId is not valid ID.");

      return users.getById(userId);
    }
    case "string": {
      assertString(userId, "userId is not valid or empty string");

      return isEmail(userId)
        ? users.getByEmail(userId)
        : users.getByLoginName(userId);
    }
    default:
      throw new TypeError("userId value type is not string or number.");
  }
}
