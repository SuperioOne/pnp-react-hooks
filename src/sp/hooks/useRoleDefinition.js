import "@pnp/sp/security";
import { InternalContext } from "../../context/internalContext.js";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useMemo, useContext } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RoleDefinitionOptions, RoleType} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRoleDefinitionInfo} from "@pnp/sp/security" **/

/**
 * Returns role definition with the specified identifier.
 *
 * @param {string | number | RoleType} roleDefinitionId - Role definition name, Id or `RoleTypeKind`.
 * @param {RoleDefinitionOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRoleDefinitionInfo | null |undefined}
 */
export function useRoleDefinition(roleDefinitionId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRoleDefinitionInfo | null | undefined, Dispatch<SetStateAction<IRoleDefinitionInfo | null |undefined>> ]} **/
  const [roleDefinition, setRoleDefinition] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      switch (typeof roleDefinitionId) {
        case "number": {
          assertID(
            roleDefinitionId,
            "Role definition id is not a valid number.",
          );
          return sp.web.roleDefinitions.getById(roleDefinitionId);
        }
        case "string": {
          assertString(
            roleDefinitionId,
            "Role definition id is not a valid string.",
          );
          return sp.web.roleDefinitions.getByName(roleDefinitionId);
        }
        case "object":
          return sp.web.roleDefinitions.getByType(roleDefinitionId.roleType);
        default:
          throw new TypeError("role definition id type is not valid.");
      }
    },
    [roleDefinitionId],
  );

  // normalize RoleType for dependency tracking
  const roleId = useMemo(
    () =>
      typeof roleDefinitionId === "object"
        ? `RT_${roleDefinitionId.roleType}`
        : roleDefinitionId,
    [roleDefinitionId],
  );

  const mergedDeps = mergeDependencies([roleId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, roleDefinitionId);

    return opt;
  }, [roleDefinitionId, options, globalOptions]);

  useQueryEffect(requestFactory, setRoleDefinition, internalOpts, mergedDeps);

  return roleDefinition;
}
