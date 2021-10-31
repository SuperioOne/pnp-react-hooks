import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type SiteUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSiteUsers(
    options?: SiteUsersOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo[]>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo[]>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.siteUsers), []);

    useQueryEffect(invokableFactory, setSiteUser, options, deps);

    return siteUser;
}