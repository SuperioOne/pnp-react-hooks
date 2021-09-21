import { useQueryEffect } from "./internal/useQueryEffect";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable, resolveGroup } from "../utils";
import { useState, useCallback } from "react";

export type GroupOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroup(
    groupIdentifier: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo>
{
    const [group, setGroup] = useState<Nullable<ISiteGroupInfo>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const group = resolveGroup(web, groupIdentifier);

        return createInvokable(group);
    }, [groupIdentifier]);

    const mergedDeps = deps
        ? [groupIdentifier].concat(deps)
        : [groupIdentifier];

    useQueryEffect(invokableFactory, setGroup, options, mergedDeps);

    return group;
}
