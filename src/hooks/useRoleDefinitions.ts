import "@pnp/sp/security";
import { IRoleDefinitionInfo } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type RoleDefinitionsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useRoleDefinitions(
    options?: RoleDefinitionsOptions,
    deps?: React.DependencyList): Nullable<IRoleDefinitionInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [roleDefinitions, setRoleDefinitions] = useState<Nullable<IRoleDefinitionInfo[]>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.roleDefinitions), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setRoleDefinitions, _options, deps);

    return roleDefinitions;
}