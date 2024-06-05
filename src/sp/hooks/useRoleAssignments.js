import "@pnp/sp/security";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns role assignmets of selected scope. Use {@link RoleAssignmentsOptions.scope} property to change scope.
 * Default is current web.
 *
 * @param {import("./options.js").RoleAssignmentsOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useRoleAssignments refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/security").IRoleAssignmentInfo[] | undefined | null }
 */
export function useRoleAssignments(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/security").IRoleAssignmentInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/security").IRoleAssignmentInfo[] | null |undefined>>
   *  ]}
   **/
  const [roleAssignments, setRoleAssignments] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) =>
      resolveScope(sp.web, options?.scope?.list, options?.scope?.item),
    [options],
  );

  const mergedDeps = mergeDependencies(
    [options?.scope?.list, options?.scope?.item],
    deps,
  );

  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setRoleAssignments, internalOpts, mergedDeps);

  return roleAssignments;
}
