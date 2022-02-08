import "@pnp/sp/site-groups";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type GroupsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroups(
    options?: GroupsOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [groups, setGroups] = useState<Nullable<ISiteGroupInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.siteGroups), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setGroups, _options, deps);

    return groups;
}