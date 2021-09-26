import "@pnp/sp/security";
import { IRoleDefinition, IRoleDefinitionInfo, RoleTypeKind } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useMemo } from "react";

export type RoleDefinitionOptions = PnpHookOptions<ODataQueryable>;

// used for differantiating role id and RoleTypeKind
interface RoleType
{
    roleType: RoleTypeKind;
}

export function useRoleDefinition(
    roleDefId: string | number | RoleType,
    options?: RoleDefinitionOptions,
    deps?: React.DependencyList): Nullable<IRoleDefinitionInfo>
{
    const [roleDefinition, setRoleDefinition] = useState<Nullable<IRoleDefinitionInfo>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        let queryInst: IRoleDefinition;

        switch (typeof roleDefId)
        {
            case "number":
                queryInst = web.roleDefinitions.getById(roleDefId);
                break;
            case "string":
                queryInst = web.roleDefinitions.getByName(roleDefId);
                break;
            case "object":
                queryInst = web.roleDefinitions.getByType(roleDefId.roleType);
                break;
            default:
                throw new ParameterError("useRoleDefinition: role definition identifier type is not valid.", "roleIdentifier", roleDefId);
        }

        return createInvokable(queryInst);

    }, [roleDefId]);

    // normalize RoleType for dependencies
    const _normRoleId = useMemo(() =>
        typeof roleDefId === "object" ? roleDefId.roleType : roleDefId
        , [roleDefId]);

    const _mergedDeps = deps
        ? [_normRoleId].concat(deps)
        : [_normRoleId];

    useQueryEffect(invokableFactory, setRoleDefinition, options, _mergedDeps);

    return roleDefinition;
}