import "@pnp/sp/site-groups";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type GroupsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroups(
    options?: GroupsOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo[]>
{
    const [groups, setGroups] = useState<Nullable<ISiteGroupInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.siteGroups), []);

    useQueryEffect(invokableFactory, setGroups, options, deps);

    return groups;
}
