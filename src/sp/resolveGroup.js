import "@pnp/sp/site-groups";
import { assertID, assertString } from "../utils/assert.js";

/**
 * Resolves SP site group by either group name or group Id.
 * @param {import('@pnp/sp/webs/types.js').IWeb} web - SP web instance.
 * @param {string | number} groupId - Group name or group numeric Id.
 * @throws {TypeError} Throws when groupId format is not valid.
 * @returns {import('@pnp/sp/site-groups/types.js').ISiteGroup} SP site group
 */
export function resolveGroup(web, groupId) {
  switch (typeof groupId) {
    case "number": {
      assertID(groupId, "groupId is not a valid ID.");
      return web.siteGroups.getById(groupId);
    }
    case "string": {
      assertString(groupId, "groupId is not a valid name.");
      return web.siteGroups.getByName(groupId);
    }
    default:
      throw new TypeError("groupId type is not number or string.");
  }
}
