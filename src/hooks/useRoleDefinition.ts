import "@pnp/sp/security";
import { IRoleDefinition, IRoleDefinitionInfo, RoleTypeKind } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type RoleDefinitionOptions = PnpHookOptions<ODataQueryable>;

// used for differantiating role id and RoleTypeKind
interface RoleType
{
    roleType: RoleTypeKind;
}

export function useRoleDefinition(
    roleIdentifier: string | number | RoleType,
    options?: RoleDefinitionOptions,
    deps?: React.DependencyList): Nullable<IRoleDefinitionInfo>
{
    const [roleDefinition, setRoleDefinition] = useState<Nullable<IRoleDefinitionInfo>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        let queryInstance: IRoleDefinition;

        switch (typeof roleIdentifier)
        {
            case "number":
                queryInstance = web.roleDefinitions.getById(roleIdentifier);
                break;
            case "string":
                queryInstance = web.roleDefinitions.getByName(roleIdentifier);
                break;
            case "object":
                queryInstance = web.roleDefinitions.getByType(roleIdentifier.roleType);
                break;
            default:
                throw new ParameterError("useRoleDefinition: role definition identifier type is not valid.", "roleIdentifier", roleIdentifier);
        }

        return createInvokable(queryInstance);

    }, [roleIdentifier]);

    const mergedDeps = deps
        ? [roleIdentifier].concat(deps)
        : [roleIdentifier];

    useQueryEffect(invokableFactory, setRoleDefinition, options, mergedDeps);

    return roleDefinition;
}