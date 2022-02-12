import "@pnp/sp/site-groups";
import { ISiteGroupInfo, ISiteGroups } from "@pnp/sp/site-groups/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { assertID, assertString } from "../utils/assert";
import { isEmail } from "../utils/isEmail";

export interface GroupsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    userId?: string | number;
}

export function useGroups(
    options?: GroupsOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [groups, setGroups] = useState<Nullable<ISiteGroupInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const userId = options?.userId;
        let queryInst: ISiteGroups;

        switch (typeof userId)
        {
            case "number":
                {
                    assertID(userId, "userId is not valid ID.");

                    queryInst = web.siteUsers.getById(userId).groups;
                    break;
                }
            case "string":
                {
                    assertString(userId, "userId is not valid or empty");

                    queryInst = isEmail(userId)
                        ? web.siteUsers.getByEmail(userId).groups
                        : web.siteUsers.getByLoginName(userId).groups;
                    break;
                }
            case "undefined":
                {
                    queryInst = web.siteGroups;
                    break;
                }
            default:
                throw new TypeError("userId value type is not string or number.");
        }
        return createInvokable(queryInst);
    }, [options?.userId]);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    const _mergedDeps = mergeDependencies([options?.userId], deps);

    useQueryEffect(invokableFactory, setGroups, _options, _mergedDeps);

    return groups;
}