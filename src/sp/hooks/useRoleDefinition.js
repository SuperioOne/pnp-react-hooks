import "@pnp/sp/security";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useMemo, useContext } from "react";

/**
 * Returns role definition with the specified identifier.
 *
 * @param {string | number | import("./options.js").RoleType} roleDefinitionId - Role definition name, Id or {@link RoleTypeKind}.
 * @param {import("./options.js").RoleDefinitionOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useRoleDefinition refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/security").IRoleDefinitionInfo | null |undefined}
 */
export function useRoleDefinition(roleDefinitionId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/security").IRoleDefinitionInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/security").IRoleDefinitionInfo | null |undefined>>
   *  ]}
   **/
  const [roleDefinition, setRoleDefinition] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
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
