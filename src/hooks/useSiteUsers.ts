import "@pnp/sp/site-users";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type UserInfoOptions = PnpHookOptions<ODataQueryableCollection & ODataQueryable>;

export function useSiteUsers(
    options?: UserInfoOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteUserInfo>>
{
    const [siteUser, setSiteUser] = useState<Nullable<Array<ISiteUserInfo>>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        return createInvokable(web.siteUsers);
    }, []);

    useQueryEffect(invokableFactory, setSiteUser, options, deps);

    return siteUser;
}