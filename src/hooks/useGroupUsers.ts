import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable, resolveGroup } from "../utils";
import { useState, useCallback } from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { GroupOptions } from "./useGroup";

export type GroupUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroupUsers(
    groupId: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteUserInfo>>
{
    const [groupUsers, setGroupUsers] = useState<Nullable<Array<ISiteUserInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);

        return createInvokable(group.users);
        
    }, [groupId]);

    const _mergedDeps = deps
        ? [groupId].concat(deps)
        : [groupId];

    useQueryEffect(invokableFactory, setGroupUsers, options, _mergedDeps);

    return groupUsers;
}
