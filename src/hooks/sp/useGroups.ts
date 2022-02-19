import "@pnp/sp/site-groups";
import { ISiteGroupInfo, ISiteGroups } from "@pnp/sp/site-groups/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { isEmail } from "../../utils/isEmail";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    /**
     * User email, login name or Id. Default is web site groups.
     * Changing userId resends request.
     */
    userId?: string | number;
}

/**
 * Returns group collection. Use {@link GroupsOptions.userId} property to get
 * groups for specific user.
 * @param options Pnp hook options.
 * @param deps useGroups will resend request when one of the dependencies changed.
 */
export function useGroups(
    options?: GroupsOptions,
    deps?: React.DependencyList): Nullable<ISiteGroupInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [groups, setGroups] = useState<Nullable<ISiteGroupInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const userId = options?.userId;
        let queryInst: ISiteGroups;

        switch (typeof userId)
        {
            case "number":
                {
                    assertID(userId, "userId is not valid ID.");
                    queryInst = sp.web.siteUsers.getById(userId).groups;
                    break;
                }
            case "string":
                {
                    assertString(userId, "userId is not valid or empty");
                    queryInst = isEmail(userId)
                        ? sp.web.siteUsers.getByEmail(userId).groups
                        : sp.web.siteUsers.getByLoginName(userId).groups;
                    break;
                }
            case "undefined":
                {
                    queryInst = sp.web.siteGroups;
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