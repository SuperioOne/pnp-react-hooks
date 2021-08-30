import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { IFetchOptions } from "@pnp/common";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { insertODataQuery, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export type UserInfoOptions = PnpHookOptions<Nullable<ODataQueryable>>;

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

            const userQuery = typeof userIdentifier === "number"
                ? web.siteUsers.getById(userIdentifier)
                : web.siteUsers.getByEmail(userIdentifier);

            return insertODataQuery(userQuery, queryOptions)
                .get(fetchOptions);
        }
        else
        {
            throw new ParameterError("useUserInfo: userIdentifier value is not valid.", userIdentifier);
        }
    }, [userIdentifier, options]);

    const mergedDeps = deps ? [userIdentifier, ...deps] : [userIdentifier];

    useQueryEffect(loadAction, setSiteUser, options, mergedDeps);

    return siteUser;
}