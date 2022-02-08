import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveUser } from "../utils/resolveUser";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { InternalContext } from "../context";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";

export interface UserOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (userId: number | string): boolean };
}

export function useUser(
    userId: number | string,
    options?: UserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const user = resolveUser(web.siteUsers, userId);

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