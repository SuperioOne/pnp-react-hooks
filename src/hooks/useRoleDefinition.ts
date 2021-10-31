import "@pnp/sp/security";
import { IRoleDefinition, IRoleDefinitionInfo, RoleTypeKind } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
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
                {
                    assertID(roleDefId, "Role definition id is not a valid number.");
                    queryInst = web.roleDefinitions.getById(roleDefId);
                    break;
                }
            case "string":
                {
                    assertString(roleDefId, "Role definition id is not a valid string.");
                    queryInst = web.roleDefinitions.getByName(roleDefId);
                    break;
                }
            case "object":
                queryInst = web.roleDefinitions.getByType(roleDefId.roleType);
                break;
            default:
                throw new TypeError("role definition id type is not valid.");
        }

        return createInvokable(queryInst);

    }, [roleDefId]);

    // normalize RoleType for dependencies
    const _normRoleId = useMemo(() =>
        typeof roleDefId === "object" ? roleDefId.roleType : roleDefId
        , [roleDefId]);

    const _mergedDeps = mergeDependencies([_normRoleId], deps);

    useQueryEffect(invokableFactory, setRoleDefinition, options, _mergedDeps);

    return roleDefinition;
}