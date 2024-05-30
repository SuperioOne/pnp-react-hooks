import "@pnp/sp/security";
import { IRoleAssignmentInfo } from "@pnp/sp/security/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection, Scope } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface RoleAssignmentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List and list item scope configuration. Default is current web scope.
   */
  scope?: Scope;
}

/**
 * Returns role assignmets of selected scope. Use {@link RoleAssignmentsOptions.scope} property to change scope.
 * Default is current web.
 * @param options PnP hook options
 * @param deps useRoleAssignments refreshes response data when one of the dependencies changes.
 */
export function useRoleAssignments(
  options?: RoleAssignmentsOptions,
  deps?: React.DependencyList,
): IRoleAssignmentInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [roleAssignments, setRoleAssignments] = useState<
    IRoleAssignmentInfo[] | undefined | null
  >(undefined);

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const scope = resolveScope(
        sp.web,
        options?.scope?.list,
        options?.scope?.item,
      );

      return createInvokable(scope.roleAssignments);
    },
    [options],
  );

  const _mergedDeps = mergeDependencies(
    [options?.scope?.list, options?.scope?.item],
    deps,
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setRoleAssignments, _options, _mergedDeps);

  return roleAssignments;
}
