import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable, resolveGroup, resolveUser } from "../utils";
import { useState, useCallback } from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { GroupOptions } from "./useGroup";

export type GroupUserOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroupUser(
    groupIdentifier: string | number,
    userIdentifier: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [groupUser, setGroupUser] = useState<Nullable<ISiteUserInfo>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const group = resolveGroup(web, groupIdentifier);
        const user = resolveUser(group.users, userIdentifier);

        return createInvokable(user);
        
    }, [groupIdentifier, userIdentifier]);

    const mergedDeps = deps
        ? [groupIdentifier, userIdentifier].concat(deps)
        : [groupIdentifier, userIdentifier];

    useQueryEffect(invokableFactory, setGroupUser, options, mergedDeps);

    return groupUser;
}


