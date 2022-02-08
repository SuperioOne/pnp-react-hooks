import "@pnp/sp/security";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IRoleDefinition, IRoleDefinitionInfo, RoleTypeKind } from "@pnp/sp/security/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useMemo, useContext } from "react";

export type RoleDefinitionOptions = PnpHookOptions<ODataQueryable>;

// used for differantiating role id and RoleTypeKind
interface RoleType
{
    roleType: RoleTypeKind;
    disabled?: DisableOptionValueType | { (roleDefId: string | number | RoleType): boolean };
}

export function useRoleDefinition(
    roleDefId: string | number | RoleType,
    options?: RoleDefinitionOptions,
    deps?: React.DependencyList): Nullable<IRoleDefinitionInfo>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, roleDefId);

        return opt;
    }, [roleDefId, options, globalOptions]);

    useQueryEffect(invokableFactory, setRoleDefinition, _options, _mergedDeps);

    return roleDefinition;
}