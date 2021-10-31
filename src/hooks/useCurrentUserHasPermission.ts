import "@pnp/sp/security";
import { ExceptionOptions, RenderOptions, WebOptions } from "../types/options";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { PermissionKind } from "@pnp/sp/security/types";
import { PnpActionFunction } from "../types/PnpActionFunction";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveScope } from "../utils/resolveScope";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useMemo } from "react";

interface Scope
{
    list: string;
    item?: number;
}

export interface CurrentUserPermissionOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    scope?: Scope;
}

export function useCurrentUserHasPermission(
    permissionKinds: PermissionKind[] | PermissionKind,
    options?: CurrentUserPermissionOptions,
    deps?: React.DependencyList): Nullable<boolean>
{
    const [hasPermission, setHasPermission] = useState<Nullable<boolean>>(undefined);

    const _permFlag = useMemo(() =>
        typeof permissionKinds === "number"
            ? permissionKinds
            : permissionKinds.reduce((p, c) => p | c)
        , [permissionKinds]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, boolean> = async function ()
        {
            const scope = resolveScope(web, {
                list: options?.scope?.list,
                item: options?.scope?.item
            });

            const basePerm = await scope.getCurrentUserEffectivePermissions();

            return scope.hasPermissions(basePerm, _permFlag);
        };

        return createInvokable(web, action);

    }, [options, _permFlag]);

    const _mergedDeps = mergeDependencies(
        [_permFlag, options?.scope?.list, options?.scope?.item],
        deps);

    useRequestEffect(invokableFactory, setHasPermission, options, _mergedDeps);

    return hasPermission;
}