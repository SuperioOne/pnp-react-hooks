import { DisableOptionValueType } from "../types/options/RenderOptions";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveGroup } from "../utils/resolveGroup";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

export function useGroup(
    groupId: string | number,
    options?: GroupOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo>
{
    const globalOptions = useContext(InternalContext);
    const [group, setGroup] = useState<Nullable<ISiteGroupInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);

        return createInvokable(group);
    }, [groupId]);

    const _mergedDeps = mergeDependencies([groupId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId);

        return opt;
    }, [groupId, options, globalOptions]);

    useQueryEffect(invokableFactory, setGroup, _options, _mergedDeps);

    return group;
}