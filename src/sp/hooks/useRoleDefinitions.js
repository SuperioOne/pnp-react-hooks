import "@pnp/sp/security";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RoleDefinitionsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRoleDefinitionInfo} from "@pnp/sp/security" **/

/** @param {SPFI} sp **/
function roleDefinitionRequest(sp) {
  return sp.web.roleDefinitions;
}

/**
 * Returns role definition collection.
 *
 * @param {RoleDefinitionsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRoleDefinitionInfo[] | undefined | null}
 */
export function useRoleDefinitions(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRoleDefinitionInfo[] | null | undefined, Dispatch<SetStateAction<IRoleDefinitionInfo[] | null |undefined>> ]} **/
  const [roleDefinitions, setRoleDefinitions] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(roleDefinitionRequest, setRoleDefinitions, internalOpts, deps);

  return roleDefinitions;
}
