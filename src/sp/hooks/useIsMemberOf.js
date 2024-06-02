import "@pnp/sp/site-groups";
import "@pnp/sp/site-users";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveUser } from "../resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/** @typedef{[undefined, undefined] |
 * [null, null] |
 * [true, import("@pnp/sp/site-groups").ISiteGroupInfo] |
 * [false, undefined]
 * } MemberInfo **/

/**
 * Returns true, if user is member of group. If not returns false.
 * Use {@link IsMemberOfOptions.userId} property for another user. Default is current user.
 *
 * @param {string | number} groupId - Group name or Id. Changing the value resends request.
 * @param {import("./options").IsMemberOfOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useIsMemberOf refreshes response data when one of the dependencies changes.
 * @returns {MemberInfo}
 */
export function useIsMemberOf(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);

  /** @type{[MemberInfo | null | undefined, import("react").Dispatch<import("react").SetStateAction<MemberInfo | null |undefined>>]} **/
  const [isMember, setIsMember] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      /** @type{(this: import("@pnp/sp/webs").IWeb) => Promise<MemberInfo>} **/
      const action = async function () {
        const user = options?.userId
          ? resolveUser(this.siteUsers, options.userId)
          : this.currentUser;

        /** @type{import("@pnp/sp/site-groups").ISiteGroups} **/
        let groups;

        switch (typeof groupId) {
          case "number": {
            assertID(groupId, "groupId is not a valid Id.");
            groups = user.groups.filter(`Id eq ${groupId}`);
            break;
          }
          case "string": {
            assertString(groupId, "groupName is not a valid name string.");
            groups = user.groups.filter(`Title eq '${groupId}'`);
            break;
          }
          default:
            throw new TypeError("groupId type is not valid.");
        }

        const response = await groups.top(1).select("Id")();
        return response.length === 1 ? [true, response[0]] : [false, undefined];
      };

      return overrideAction(sp.web, action);
    },
    [options?.userId, groupId],
  );

  const mergedDeps = mergeDependencies([groupId, options?.userId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(requestFactory, setIsMember, internalOpts, mergedDeps);

  return isMember ?? [undefined, undefined];
}
