import "@pnp/sp/site-users";
import { DisableOptionValueType } from "../../types";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { resolveUser } from "../resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupUserOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (groupId: string | number, userId: string | number): boolean };
}

/**
 * Returns an user from specific group user collection.
 * @param groupId Group name or Id. Changing the value resends request.
 * @param userId User email, login name or Id. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useGroupUser refreshes response data when one of the dependencies changes.
 */
export function useGroupUser(
  groupId: string | number,
  userId: string | number,
  options?: GroupUserOptions,
  deps?: React.DependencyList,
): ISiteUserInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [groupUser, setGroupUser] = useState<
    ISiteUserInfo | null | undefined
  >();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const group = resolveGroup(sp.web, groupId);
      const user = resolveUser(group.users, userId);

      return createInvokable(user);
    },
    [groupId, userId],
  );

  const _mergedDeps = mergeDependencies([groupId, userId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      groupId,
      userId,
    );

    return opt;
  }, [groupId, userId, options, globalOptions]);

  useQueryEffect(invokableFactory, setGroupUser, _options, _mergedDeps);

  return groupUser;
}
