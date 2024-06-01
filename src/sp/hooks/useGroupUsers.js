import { DisableOptionValueType } from "../../types";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupUsersOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

/**
 * Returns user collection from specific group.
 * @param groupId Group name or Id. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useGroupUsers refreshes response data when one of the dependencies changes.
 */
export function useGroupUsers(
  groupId: string | number,
  options?: GroupUsersOptions,
  deps?: React.DependencyList,
): ISiteUserInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [groupUsers, setGroupUsers] = useState<
    ISiteUserInfo[] | undefined | null
  >();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const group = resolveGroup(sp.web, groupId);
      return overrideAction(group.users);
    },
    [groupId],
  );

  const _mergedDeps = mergeDependencies([groupId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(invokableFactory, setGroupUsers, _options, _mergedDeps);

  return groupUsers;
}
