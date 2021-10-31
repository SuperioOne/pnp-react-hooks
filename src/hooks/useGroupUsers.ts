import { useState, useCallback } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";
import { resolveGroup } from "../utils/resolveGroup";
import { mergeDependencies } from "../utils/mergeDependencies";
import { createInvokable } from "../utils/createInvokable";
import { PnpHookOptions } from "../types/options";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { Nullable } from "../types/utilityTypes";
import { IWeb } from "@pnp/sp/webs/types";
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
