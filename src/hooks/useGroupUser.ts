import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveGroup } from "../utils/resolveGroup";
import { resolveUser } from "../utils/resolveUser";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type GroupUserOptions = PnpHookOptions<ODataQueryable>;

export function useGroupUser(
    groupId: string | number,
    userId: string | number,
    options?: GroupUserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [groupUser, setGroupUser] = useState<Nullable<ISiteUserInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);
        const user = resolveUser(group.users, userId);

        return createInvokable(user);

    }, [groupId, userId]);

    const _mergedDeps = mergeDependencies([groupId, userId], deps);

    useQueryEffect(invokableFactory, setGroupUser, options, _mergedDeps);

    return groupUser;
}


