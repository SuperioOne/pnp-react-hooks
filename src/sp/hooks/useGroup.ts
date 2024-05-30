import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

/**
 * Returns a group from group collection.
 * @param groupId Group Id or name. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useGroup refreshes response data when one of the dependencies changes.
 */
export function useGroup(
  groupId: string | number,
  options?: GroupOptions,
  deps?: React.DependencyList,
): Nullable<ISiteGroupInfo> {
  const globalOptions = useContext(InternalContext);
  const [group, setGroup] = useState<Nullable<ISiteGroupInfo>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const group = resolveGroup(sp.web, groupId);
      return createInvokable(group);
    },
    [groupId],
  );

  const _mergedDeps = mergeDependencies([groupId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(invokableFactory, setGroup, _options, _mergedDeps);

  return group;
}
