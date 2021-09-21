import "@pnp/sp/security";
import "@pnp/sp/site-users";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IWeb } from "@pnp/sp/webs/types";
import { ParameterError } from "../errors/ParameterError";
import { PermissionKind } from "@pnp/sp/security/types";
import { createInvokable, isEmail, resolveScope } from "../utils";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useMemo } from "react";

interface Scope
{
    list: string;
    item?: number;
}

export interface UserPermissionOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    scope?: Scope;
}

export function useUserHasPermission(
    permissionKinds: Array<PermissionKind> | PermissionKind,
    userIdentifier: string | number,
    options?: UserPermissionOptions,
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
            let userLoginName: string;

            switch (typeof userIdentifier)
            {
                case "number":
                    {
                        userLoginName = (await web.siteUsers.getById(userIdentifier).select("LoginName")()).LoginName;
                        break;
                    }
                case "string":
                    {
                        userLoginName = isEmail(userIdentifier)
                            ? (await web.siteUsers.getByEmail(userIdentifier).select("LoginName")()).LoginName
                            : userIdentifier;

                        break;
                    }
                default:
                    throw new ParameterError("useUserHasPermission: userIdentifier value is not valid.", "userIdentifier", userIdentifier);
            }

            const scope = resolveScope(web, {
                list: options?.scope?.list,
                item: options?.scope?.item
            });

            const basePermission = await scope.getUserEffectivePermissions(userLoginName);

            return scope.hasPermissions(basePermission, _permissionFlag);
        };

        return createInvokable(web, action);
    }, [userIdentifier, options, _permissionFlag]);

    const mergedDeps = deps
        ? [userIdentifier, _permissionFlag, options?.scope?.list, options?.scope?.item].concat(deps)
        : [userIdentifier, _permissionFlag, options?.scope?.list, options?.scope?.item];

    useRequestEffect(invokableFactory, setHasPermission, options, mergedDeps);

    return hasPermission;
}