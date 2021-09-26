import { useQueryEffect } from "./internal/useQueryEffect";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryable } from "../types";
import { createInvokable, resolveGroup } from "../utils";
import { useState, useCallback } from "react";

export type GroupOptions = PnpHookOptions<ODataQueryable>;

export function useGroup(
    groupId: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo>
{
    const [group, setGroup] = useState<Nullable<ISiteGroupInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);

        return createInvokable(group);

    }, [groupId]);

    const _mergedDeps = deps
        ? [groupId].concat(deps)
        : [groupId];

    useQueryEffect(invokableFactory, setGroup, options, _mergedDeps);

    return group;
}
