import "@pnp/sp/security";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RoleAssignmentsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRoleAssignmentInfo} from "@pnp/sp/security" **/

/**
 * Returns role assignmets of selected scope. Use `RoleAssignmentsOptions.scope` property to change scope.
 * Default is current web.
 *
 * @param {RoleAssignmentsOptions} [options] - Hook options
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRoleAssignmentInfo[] | undefined | null }
 */
export function useRoleAssignments(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRoleAssignmentInfo[] | null | undefined, Dispatch<SetStateAction<IRoleAssignmentInfo[] | null |undefined>> ]} **/
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
