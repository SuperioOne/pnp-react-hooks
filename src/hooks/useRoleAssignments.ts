import "@pnp/sp/items";
import "@pnp/sp/security";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IItem } from "@pnp/sp/items/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable, resolveList } from "../utils";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback } from "react";

interface Scope
{
    list: string;
    item?: number;
}

export interface CurrentUserPermissionOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    scope?: Scope;
}

export function useRoleAssignments(
    options?: CurrentUserPermissionOptions,
    deps?: React.DependencyList): Nullable<boolean>
{
    const [hasPermission, setHasPermission] = useState<Nullable<boolean>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, boolean> = async function ()
        {
            let permissionScope: IWeb | IList | IItem;

            if (options?.scope?.list)
            {
                permissionScope = resolveList(this, options.scope.list);

                if (options.scope.item && !isNaN(options.scope.item))
                {
                    permissionScope = permissionScope.items.getById(options.scope.item);
                }
            }
            else
            {
                permissionScope = this;
            }

            const basePermission = await permissionScope.roleAssignments();

            return permissionScope()
        }

        return createInvokable(web, action);
    }, [options, _permissionFlag]);

    const mergedDeps = deps
        ? [options?.scope?.list, options?.scope?.item].concat(deps)
        : [options?.scope?.list, options?.scope?.item];

    useRequestEffect(invokableFactory, setHasPermission, options, mergedDeps);

    return hasPermission;
}