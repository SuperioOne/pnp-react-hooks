import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveGroup } from "../utils/resolveGroup";
import { useQueryEffect } from "./internal/useQueryEffect";
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

    const _mergedDeps = mergeDependencies([groupId], deps);

    useQueryEffect(invokableFactory, setGroup, options, _mergedDeps);

    return group;
}
