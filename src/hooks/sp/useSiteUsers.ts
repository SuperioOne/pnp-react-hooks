import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type SiteUsersOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns site users.
 * @param options PnP hook options.
 * @param deps useSiteUsers will resend request when one of the dependencies changed.
 */
export function useSiteUsers(
    options?: SiteUsersOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo[]>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) => createInvokable(sp.web.siteUsers), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setSiteUser, _options, deps);

    return siteUser;
}