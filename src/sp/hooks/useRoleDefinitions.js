import "@pnp/sp/security";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/** @param {SPFI} sp **/
function roleDefinitionRequest(sp) {
  return sp.web.roleDefinitions;
}

/**
 * Returns role definition collection.
 *
 * @param {import("./options").RoleDefinitionsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useRoleDefinitions refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/security").IRoleDefinitionInfo[] | undefined | null}
 */
export function useRoleDefinitions(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/security").IRoleDefinitionInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/security").IRoleDefinitionInfo[] | null |undefined>>]} **/
  const [roleDefinitions, setRoleDefinitions] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(roleDefinitionRequest, setRoleDefinitions, internalOpts, deps);

  return roleDefinitions;
}
