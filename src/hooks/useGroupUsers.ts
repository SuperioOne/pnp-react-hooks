import { useQueryEffect } from "./internal/useQuery";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { GroupOptions } from "./useGroup";

export type GroupUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroupUsers(
    groupIdentifier: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteUserInfo>>
{
    const [group, setGroup] = useState<Nullable<Array<ISiteUserInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = typeof groupIdentifier === "number"
            ? web.siteGroups.getById(groupIdentifier)
            : web.siteGroups.getByName(groupIdentifier);

        return createInvokable(queryInstance.users);
    }, [groupIdentifier]);

    const mergedDeps = deps
        ? [groupIdentifier].concat(deps)
        : [groupIdentifier];

    useQueryEffect(invokableFactory, setGroup, options, mergedDeps);

    return group;
}
