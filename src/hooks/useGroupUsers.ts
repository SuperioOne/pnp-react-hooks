import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable, mergeDependencies, resolveGroup } from "../utils";
import { useState, useCallback } from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

export type GroupUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroupUsers(
    groupId: string | number,
    options?: GroupUsersOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo[]>
{
    const [groupUsers, setGroupUsers] = useState<Nullable<ISiteUserInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);

        return createInvokable(group.users);

    }, [groupId]);

    const _mergedDeps = mergeDependencies([groupId], deps);

    useQueryEffect(invokableFactory, setGroupUsers, options, _mergedDeps);

    return groupUsers;
}
