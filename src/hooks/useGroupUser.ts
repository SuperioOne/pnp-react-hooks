import "@pnp/sp/site-users";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveGroup } from "../utils/resolveGroup";
import { resolveUser } from "../utils/resolveUser";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface GroupUserOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (groupId: string | number, userId: string | number): boolean };
}

export function useGroupUser(
    groupId: string | number,
    userId: string | number,
    options?: GroupUserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [groupUser, setGroupUser] = useState<Nullable<ISiteUserInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const group = resolveGroup(web, groupId);
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