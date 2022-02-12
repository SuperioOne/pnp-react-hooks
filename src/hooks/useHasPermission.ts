import "@pnp/sp/security";
import "@pnp/sp/site-users";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { ExceptionOptions, RenderOptions, WebOptions } from "../types/options";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { PermissionKind } from "@pnp/sp/security/types";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { isEmail } from "../utils/isEmail";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useMemo, useContext } from "react";
import { isNull } from "../utils/isNull";

interface Scope
{
    list: string;
    item?: number;
}

export interface UserPermissionOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    userId?: string | number;
    scope?: Scope;
    disabled?: DisableOptionValueType | { (permissionKinds: PermissionKind[] | PermissionKind, userId: string | number): boolean };
}

export function useHasPermission(
    permissionKinds: PermissionKind[] | PermissionKind,
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
        let userLoginName: string | undefined;
        const userId = options?.userId;

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
            case "undefined":
                {
                    userLoginName = undefined;
                    break;
                }
            default:
                throw new TypeError("userId value type is not string or number.");
        }

        const scope = resolveScope(web, {
            list: options?.scope?.list,
            item: options?.scope?.item
        });

        const action = async function (this: IWeb)
        {
            const basePerm = await (isNull(userLoginName)
                ? scope.getCurrentUserEffectivePermissions()
                : scope.getUserEffectivePermissions(userLoginName));

            return scope.hasPermissions(basePerm, _permFlag);
        };

        return createInvokable(web, action);
    }, [options, _permFlag]);

    const _mergedDeps = mergeDependencies(
        [options?.userId, _permFlag, options?.scope?.list, options?.scope?.item],
        deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, permissionKinds);

        return opt;
    }, [permissionKinds, options, globalOptions]);

    useRequestEffect(invokableFactory, setHasPermission, _options, _mergedDeps);

    return hasPermission;
}
