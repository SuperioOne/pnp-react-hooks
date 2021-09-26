import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryable } from "../types";
import { createInvokable, resolveGroup, resolveUser } from "../utils";
import { useState, useCallback } from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { GroupOptions } from "./useGroup";

export type GroupUserOptions = PnpHookOptions<ODataQueryable>;

export function useGroupUser(
    groupId: string | number,
    userId: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [groupUser, setGroupUser] = useState<Nullable<ISiteUserInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);
        const user = resolveUser(group.users, userId);

        return createInvokable(user);

    }, [groupId, userId]);

    const _mergedDeps = deps
        ? [groupId, userId].concat(deps)
        : [groupId, userId];

    useQueryEffect(invokableFactory, setGroupUser, options, _mergedDeps);

    return groupUser;
}


