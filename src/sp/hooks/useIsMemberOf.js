import "@pnp/sp/site-groups";
import "@pnp/sp/site-users";
import { InternalContext } from "../../context/internalContext.js";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveUser } from "../resolveUser.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {IsMemberOfOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IWeb} from "@pnp/sp/webs" **/
/** @import {ISiteGroupInfo, ISiteGroups} from "@pnp/sp/site-groups" **/

/** @typedef{[undefined, undefined] |
 * [null, null] |
 * [true, ISiteGroupInfo] |
 * [false, undefined]
 * } MemberInfo
 **/

/**
 * Returns true, if user is member of group. If not returns false.
 * Use {@link IsMemberOfOptions.userId} property for another user. Default is current user.
 *
 * @param {string | number} groupId - Group name or Id. Value is automatically tracked for changes.
 * @param {IsMemberOfOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {MemberInfo}
 */
export function useIsMemberOf(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);

  /** @type{[ MemberInfo | null | undefined, Dispatch<SetStateAction<MemberInfo | null |undefined>> ]} **/
  const [isMember, setIsMember] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      /** @type{(this: IWeb) => Promise<MemberInfo>} **/
      const action = async function () {
        const user = options?.userId
          ? resolveUser(this.siteUsers, options.userId)
          : this.currentUser;

        /** @type{ISiteGroups} **/
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
