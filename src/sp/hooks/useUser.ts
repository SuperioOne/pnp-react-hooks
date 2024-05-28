import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveUser } from "../../utils/resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { SPFI } from "@pnp/sp";

export interface UserOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (userId: number | string): boolean };
}

/**
 * Returns an user from site user collection.
 * @param userId User Id, login name, email.
 * @param options 
 * @param deps 
 * @returns 
 */
export function useUser(
    userId: number | string,
    options?: UserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const user = resolveUser(sp.web.siteUsers, userId);
        return createInvokable(user);
    }, [userId]);

    const _mergedDeps = mergeDependencies([userId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, userId);

        return opt;
    }, [userId, options, globalOptions]);

    useQueryEffect(invokableFactory, setSiteUser, _options, _mergedDeps);

    return siteUser;
}