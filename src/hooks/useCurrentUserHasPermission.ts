import "@pnp/sp/security";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IWeb } from "@pnp/sp/webs/types";
import { PermissionKind } from "@pnp/sp/security/types";
import { createInvokable, resolveScope } from "../utils";
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

    const _permissionFlag: PermissionKind = useMemo(() =>
    {
        if (typeof permissionKinds === "number")
        {
            return permissionKinds;
        }
        else
        {
            return permissionKinds.reduce((p, c) => p | c);
        }
    }, [permissionKinds]);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, boolean> = async function ()
        {
            const scope = resolveScope(web, {
                list: options?.scope?.list,
                item: options?.scope?.item
            });

            const basePermission = await scope.getCurrentUserEffectivePermissions();

            return scope.hasPermissions(basePermission, _permissionFlag);
        };

        return createInvokable(web, action);
    }, [options, _permissionFlag]);

    const mergedDeps = deps
        ? [_permissionFlag, options?.scope?.list, options?.scope?.item].concat(deps)
        : [_permissionFlag, options?.scope?.list, options?.scope?.item];

    useRequestEffect(invokableFactory, setHasPermission, options, mergedDeps);

    return hasPermission;
}