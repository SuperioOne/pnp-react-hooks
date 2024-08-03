import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveGroup } from "../resolveGroup.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {GroupUsersOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteUserInfo} from "@pnp/sp/site-users" **/

/**
 * Returns user collection from specific group.
 *
 * @param {string | number} groupId - Group name or Id. Value is automatically tracked for changes.
 * @param {GroupUsersOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteUserInfo[] | null | undefined}
 */
export function useGroupUsers(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteUserInfo[] | null | undefined, Dispatch<SetStateAction<ISiteUserInfo[] | null |undefined>> ]} **/
  const [groupUsers, setGroupUsers] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const group = resolveGroup(sp.web, groupId);
      return group.users;
    },
    [groupId],
  );

  const mergedDeps = mergeDependencies([groupId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(requestFactory, setGroupUsers, internalOpts, mergedDeps);

  return groupUsers;
}
