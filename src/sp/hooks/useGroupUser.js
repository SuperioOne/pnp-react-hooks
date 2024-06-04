import "@pnp/sp/site-users";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { resolveUser } from "../resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns an user from specific group user collection.
 *
 * @param {string | number} groupId - Group name or Id. Changing the value resends request.
 * @param {string | number} userId - User email, login name or Id. Changing the value resends request.
 * @param {import("./options").GroupUserOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useGroupUser refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo | null | undefined}
 */
export function useGroupUser(groupId, userId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *     import("@pnp/sp/site-users").ISiteUserInfo | null | undefined,
   *     import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo | null |undefined>>
   *  ]}
   **/
  const [groupUser, setGroupUser] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
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
