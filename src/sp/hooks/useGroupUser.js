import "@pnp/sp/site-users";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveGroup } from "../resolveGroup.js";
import { resolveUser } from "../resolveUser.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {GroupUserOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteUserInfo} from "@pnp/sp/site-users" **/

/**
 * Returns an user from specific group user collection.
 *
 * @param {string | number} groupId - Group name or Id. Value is automatically tracked for changes.
 * @param {string | number} userId - User email, login name or Id. Value is automatically tracked for changes.
 * @param {GroupUserOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteUserInfo | null | undefined}
 */
export function useGroupUser(groupId, userId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteUserInfo | null | undefined, Dispatch<SetStateAction<ISiteUserInfo | null |undefined>> ]} **/
  const [groupUser, setGroupUser] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const group = resolveGroup(sp.web, groupId);
      return resolveUser(group.users, userId);
    },
    [groupId, userId],
  );

  const mergedDeps = mergeDependencies([groupId, userId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, groupId, userId);

    return opt;
  }, [groupId, userId, options, globalOptions]);

  useQueryEffect(requestFactory, setGroupUser, internalOpts, mergedDeps);

  return groupUser;
}
