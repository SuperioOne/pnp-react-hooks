import "@pnp/sp/security";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns role assignmets of selected scope. Use {@link RoleAssignmentsOptions.scope} property to change scope.
 * Default is current web.
 *
 * @param {import("./options").RoleAssignmentsOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useRoleAssignments refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/security").IRoleAssignmentInfo[] | undefined | null }
 */
export function useRoleAssignments(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/security").IRoleAssignmentInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/security").IRoleAssignmentInfo[] | null |undefined>>]} **/
  const [roleAssignments, setRoleAssignments] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) =>
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
