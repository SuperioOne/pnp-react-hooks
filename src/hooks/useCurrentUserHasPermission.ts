import "@pnp/sp/security";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IWeb } from "@pnp/sp/webs/types";
import { PermissionKind } from "@pnp/sp/security/types";
import { createInvokable, mergeDependencies, resolveScope } from "../utils";
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
    permissionKinds: Array<PermissionKind> | PermissionKind,
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