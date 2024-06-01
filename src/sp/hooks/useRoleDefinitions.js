import "@pnp/sp/security";
import { IRoleDefinitionInfo } from "@pnp/sp/security/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type RoleDefinitionsOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns role definition collection.
 * @param options PnP hook options.
 * @param deps useRoleDefinitions refreshes response data when one of the dependencies changes.
 */
export function useRoleDefinitions(
  options?: RoleDefinitionsOptions,
  deps?: React.DependencyList,
): IRoleDefinitionInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [roleDefinitions, setRoleDefinitions] = useState<
    IRoleDefinitionInfo[] | undefined | null
  >(undefined);

  const invokableFactory = useCallback(
    async (sp: SPFI) => overrideAction(sp.web.roleDefinitions),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setRoleDefinitions, _options, deps);

  return roleDefinitions;
}
