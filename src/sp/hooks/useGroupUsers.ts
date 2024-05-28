import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveGroup } from "../../utils/resolveGroup";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupUsersOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

/**
 * Returns user collection from specific group.
 * @param groupId Group name or Id. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useGroupUsers refreshes response data when one of the dependencies changes.
 */
export function useGroupUsers(
    groupId: string | number,
    options?: GroupUsersOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [groupUsers, setGroupUsers] = useState<Nullable<ISiteUserInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const group = resolveGroup(sp.web, groupId);
        return createInvokable(group.users);
    }, [groupId]);

    const _mergedDeps = mergeDependencies([groupId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId);

        return opt;
    }, [groupId, options, globalOptions]);

    useQueryEffect(invokableFactory, setGroupUsers, _options, _mergedDeps);

    return groupUsers;
}