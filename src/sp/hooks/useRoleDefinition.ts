import "@pnp/sp/security";
import { DisableOptionValueType } from "../../types";
import {
  IRoleDefinition,
  IRoleDefinitionInfo,
  RoleTypeKind,
} from "@pnp/sp/security/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useMemo, useContext } from "react";

export interface RoleDefinitionOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (roleDefId: string | number | RoleType): boolean };
}

// used for differentiating role id and RoleTypeKind
export interface RoleType {
  roleType: RoleTypeKind;
}

/**
 * Returns role definition with the specified identifier.
 * @param roleDefId Role definition name, Id or {@link RoleTypeKind}.
 * @param options PnP hook options.
 * @param deps useRoleDefinition refreshes response data when one of the dependencies changes.
 */
export function useRoleDefinition(
  roleDefId: string | number | RoleType,
  options?: RoleDefinitionOptions,
  deps?: React.DependencyList,
): IRoleDefinitionInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [roleDefinition, setRoleDefinition] = useState<
    IRoleDefinitionInfo | null | undefined
  >(undefined);

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      let queryInst: IRoleDefinition;

      switch (typeof roleDefId) {
        case "number": {
          assertID(roleDefId, "Role definition id is not a valid number.");
          queryInst = sp.web.roleDefinitions.getById(roleDefId);
          break;
        }
        case "string": {
          assertString(roleDefId, "Role definition id is not a valid string.");
          queryInst = sp.web.roleDefinitions.getByName(roleDefId);
          break;
        }
        case "object":
          queryInst = sp.web.roleDefinitions.getByType(roleDefId.roleType);
          break;
        default:
          throw new TypeError("role definition id type is not valid.");
      }

      return createInvokable(queryInst);
    },
    [roleDefId],
  );

  // normalize RoleType for dependencies
  const _normRoleId = useMemo(
    () =>
      typeof roleDefId === "object" ? `RT_${roleDefId.roleType}` : roleDefId,
    [roleDefId],
  );

  const _mergedDeps = mergeDependencies([_normRoleId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, roleDefId);

    return opt;
  }, [roleDefId, options, globalOptions]);

  useQueryEffect(invokableFactory, setRoleDefinition, _options, _mergedDeps);

  return roleDefinition;
}
