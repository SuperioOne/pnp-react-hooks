import "@pnp/sp/site-users";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveGroup } from "../../utils/resolveGroup";
import { resolveUser } from "../../utils/resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupUserOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (groupId: string | number, userId: string | number): boolean };
}

/**
 * Returns an user from specific group user collection.
 * @param groupId Group name or Id. Changing the value resends request.
 * @param userId User email, login name or Id. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useGroupUser refreshes response data when one of the dependencies changes.
 */
export function useGroupUser(
    groupId: string | number,
    userId: string | number,
    options?: GroupUserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [groupUser, setGroupUser] = useState<Nullable<ISiteUserInfo>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const group = resolveGroup(sp.web, groupId);
        const user = resolveUser(group.users, userId);

        return createInvokable(user);
    }, [groupId, userId]);

    const _mergedDeps = mergeDependencies([groupId, userId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId, userId);

        return opt;
    }, [groupId, userId, options, globalOptions]);

    useQueryEffect(invokableFactory, setGroupUser, _options, _mergedDeps);

    return groupUser;
}