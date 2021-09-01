import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Nullable, ODataQueryable, PnpHookOptions, CacheOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { useState, useCallback } from "react";
import { IWeb } from "@pnp/sp/webs";

export interface UserInfoOptions extends PnpHookOptions<ODataQueryable>, CacheOptions { }

export function useUserInfo(
    userIdentifier: number | string,
    options?: UserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const loadAction = useCallback((web: IWeb) =>
    {
        if (userIdentifier)
        {
            return typeof userIdentifier === "number"
                ? web.siteUsers.getById(userIdentifier)
                : web.siteUsers.getByEmail(userIdentifier);
        }
        else
        {
            throw new ParameterError("useUserInfo: userIdentifier value is not valid.", userIdentifier);
        }
    }, [userIdentifier]);

    const mergedDeps = deps
        ? [userIdentifier, ...deps]
        : [userIdentifier];

    useQueryEffect(loadAction, setSiteUser, options, mergedDeps);

    return siteUser;
}