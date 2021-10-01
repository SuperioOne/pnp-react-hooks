import "@pnp/sp/security";
import { IRoleDefinitionInfo } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type RoleDefinitionsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useRoleDefinitions(
    options?: RoleDefinitionsOptions,
    deps?: React.DependencyList): Nullable<IRoleDefinitionInfo[]>
{
    const [roleDefinitions, setRoleDefinitions] = useState<Nullable<IRoleDefinitionInfo[]>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.roleDefinitions), []);

    useQueryEffect(invokableFactory, setRoleDefinitions, options, deps);

    return roleDefinitions;
}