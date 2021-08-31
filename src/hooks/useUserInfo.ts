import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { IFetchOptions } from "@pnp/common";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Nullable, ODataQueryable, PnpHookOptions, CacheOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { insertODataQuery, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface UserInfoOptions extends PnpHookOptions<Nullable<ODataQueryable>>, CacheOptions { }

export function useUserInfo(
    userIdentifier: number | string,
    options?: UserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const loadAction = useCallback((fetchOptions?: IFetchOptions) =>
    {
        if (userIdentifier)
        {
            const queryOptions = options?.query;

            const web = resolveWeb(options);

            let userQuery = typeof userIdentifier === "number"
                ? web.siteUsers.getById(userIdentifier)
                : web.siteUsers.getByEmail(userIdentifier);

            if (options?.useCache)
            {
                userQuery = userQuery.usingCaching(options.useCache);
            }

            return insertODataQuery(userQuery, queryOptions)
                .get(fetchOptions);
        }
        else
        {
            throw new ParameterError("useUserInfo: userIdentifier value is not valid.", userIdentifier);
        }
    }, [userIdentifier, options]);

    const mergedDeps = deps
        ? [userIdentifier, ...deps]
        : [userIdentifier];

    useQueryEffect(loadAction, setSiteUser, options, mergedDeps);

    return siteUser;
}