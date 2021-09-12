import useQueryEffect from "./internal/useQuery";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable } from "../utils";
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
        const group = typeof groupIdentifier === "number"
            ? web.siteGroups.getById(groupIdentifier)
            : web.siteGroups.getByName(groupIdentifier);

        const queryInstance = typeof userIdentifier === "number"
            ? group.users.getById(userIdentifier)
            : group.users.getByEmail(userIdentifier);

        return createInvokable(queryInstance);
    }, [groupIdentifier, userIdentifier]);

    const mergedDeps = deps
        ? [groupIdentifier, userIdentifier].concat(deps)
        : [groupIdentifier, userIdentifier];

    useQueryEffect(invokableFactory, setGroupUser, options, mergedDeps);

    return groupUser;
}


