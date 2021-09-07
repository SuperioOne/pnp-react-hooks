import "@pnp/sp/site-users";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type UserInfoOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSiteUsers(
    options?: UserInfoOptions,
    deps?: React.DependencyList): Nullable<Array<ISiteUserInfo>>
{
    const [siteUser, setSiteUser] = useState<Nullable<Array<ISiteUserInfo>>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = web.siteUsers;
        return createInvokable(queryInstance, queryInstance.defaultAction);
    }, []);

    useQueryEffect(invokableFactory, setSiteUser, options, deps);

    return siteUser;
}