import "@pnp/sp/security";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable, resolveScope } from "../utils";
import { useState, useCallback } from "react";
import { IRoleAssignmentInfo } from "@pnp/sp/security/types";
import { useQueryEffect } from "./internal/useQueryEffect";

interface Scope
{
    list: string;
    item?: number;
}

export interface RoleAssignmentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    scope?: Scope;
}

export function useRoleAssignments(
    options?: RoleAssignmentsOptions,
    deps?: React.DependencyList): Nullable<Array<IRoleAssignmentInfo>>
{
    const [roleAssignments, setRoleAssignments] = useState<Nullable<Array<IRoleAssignmentInfo>>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, {
            list: options?.scope?.list,
            item: options?.scope?.item
        });

        return createInvokable(scope.roleAssignments);
    }, [options]);

    const _mergedDeps = deps
        ? [options?.scope?.list, options?.scope?.item].concat(deps)
        : [options?.scope?.list, options?.scope?.item];

    useQueryEffect(invokableFactory, setRoleAssignments, options, _mergedDeps);

    return roleAssignments;
}