import "@pnp/sp/site-groups";
import { useQueryEffect } from "./internal/useQuery";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PnpHookOptions, ODataQueryableCollection } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type GroupsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useGroups(
    options?: GroupsOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteGroupInfo>>
{
    const [groups, setGroups] = useState<Nullable<Array<ISiteGroupInfo>>>();

    const invokableFactory = useCallback((web: IWeb) => createInvokable(web.siteGroups), []);

    useQueryEffect(invokableFactory, setGroups, options, deps);

    return groups;
}
