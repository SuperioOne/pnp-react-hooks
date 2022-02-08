import "@pnp/sp/security";
import "@pnp/sp/site-users";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { ExceptionOptions, RenderOptions, WebOptions } from "../types/options";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { PermissionKind } from "@pnp/sp/security/types";
import { PnpActionFunction } from "../types/PnpActionFunction";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { isEmail } from "../utils/isEmail";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useMemo, useContext } from "react";

interface Scope
{
    list: string;
    item?: number;
}

export interface UserPermissionOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    scope?: Scope;
    disabled?: DisableOptionValueType | { (permissionKinds: PermissionKind[] | PermissionKind, userId: string | number): boolean };
}

export function useUserHasPermission(
    permissionKinds: PermissionKind[] | PermissionKind,
    userId: string | number,
    options?: UserPermissionOptions,
    deps?: React.DependencyList): Nullable<boolean>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, permissionKinds, userId);

        return opt;
    }, [permissionKinds, userId, options, globalOptions]);

    useRequestEffect(invokableFactory, setHasPermission, _options, _mergedDeps);

    return hasPermission;
}
