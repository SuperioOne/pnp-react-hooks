import "@pnp/sp/security";
import "@pnp/sp/site-users";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IWeb } from "@pnp/sp/webs/types";
import { PermissionKind } from "@pnp/sp/security/types";
import { assertID, assertString, createInvokable, isEmail, mergeDependencies, resolveScope } from "../utils";
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
    permissionKinds: PermissionKind[] | PermissionKind,
    userId: string | number,
    options?: UserPermissionOptions,
    deps?: React.DependencyList): Nullable<boolean>
{
    const [hasPermission, setHasPermission] = useState<Nullable<boolean>>(undefined);

    const _permFlag: PermissionKind = useMemo(() =>
        typeof permissionKinds === "number"
            ? permissionKinds
            : permissionKinds.reduce((p, c) => p | c)
        , [permissionKinds]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, boolean> = async function ()
        {
            let userLoginName: string;

            switch (typeof userId)
            {
                case "number":
                    {
                        assertID(userId, "userId is not valid ID.");

                        userLoginName = (await web.siteUsers.getById(userId).select("LoginName")()).LoginName;
                        break;
                    }
                case "string":
                    {
                        assertString(userId, "userId is not valid or empty");

                        userLoginName = isEmail(userId)
                            ? (await web.siteUsers.getByEmail(userId).select("LoginName")()).LoginName
                            : userId;

                        break;
                    }
                default:
                    throw new TypeError("userId value type is not string or number.");
            }

            const scope = resolveScope(web, {
                list: options?.scope?.list,
                item: options?.scope?.item
            });

            const basePerm = await scope.getUserEffectivePermissions(userLoginName);

            return scope.hasPermissions(basePerm, _permFlag);
        };

        return createInvokable(web, action);
    }, [userId, options, _permFlag]);

    const _mergedDeps = mergeDependencies(
        [userId, _permFlag, options?.scope?.list, options?.scope?.item],
        deps);

    useRequestEffect(invokableFactory, setHasPermission, options, _mergedDeps);

    return hasPermission;
}
