import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { IFetchOptions } from "@pnp/common";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Nullable, ODataQueryable, PnpHookOptions, SPQuery } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { insertODataQuery, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface UserQuery extends SPQuery, ODataQueryable { }

export function useUserInfo(
    userIdentifier: number | string,
    query?: UserQuery,
    options?: PnpHookOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const loadAction = useCallback((fetchOptions?: IFetchOptions) =>
    {
        if (userIdentifier)
        {
            const web = resolveWeb(query);

            const userQuery = typeof userIdentifier === "number"
                ? web.siteUsers.getById(userIdentifier)
                : web.siteUsers.getByEmail(userIdentifier);

            return insertODataQuery(userQuery, query)
                .get(fetchOptions);
        }
        else
        {
            throw new ParameterError("useUserInfo: userIdentifier value is not valid.", userIdentifier);
        }
    }, [userIdentifier, query]);

    const mergedDeps = deps ? [userIdentifier, ...deps] : [userIdentifier];

    useQueryEffect(loadAction, setSiteUser, query, options, mergedDeps);

    return siteUser;
}