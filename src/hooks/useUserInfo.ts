import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import type { ErrorAction, ODataQueryable, RequestAction, SPQuery } from "../types";
import type { ISiteUserInfo } from "@pnp/sp/site-users/types";
import useQueryEffect from "./internal/useQuery";
import { insertODataQuery, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface UserQuery extends SPQuery, ODataQueryable { }

export function useUserInfo(
    userIdentifier: number | string,
    query: UserQuery,
    exception: boolean | ErrorAction = console.error): [ISiteUserInfo, RequestAction]
{
    const [siteUser, setSiteUser] = useState<ISiteUserInfo>(undefined);

    const loadAction: RequestAction = useCallback(async () =>
    {
        try
        {
            if (userIdentifier)
            {
                setSiteUser(undefined);

                const web = resolveWeb(query);

                const userQuery = typeof userIdentifier === "number"
                    ? web.siteUsers.getById(userIdentifier)
                    : web.siteUsers.getByEmail(userIdentifier);

                const data = await insertODataQuery(userQuery, query).get();

                setSiteUser(data);
                return true;
            }
        }
        catch (err)
        {
            setSiteUser(null);
            throw err;
        }
    }, [userIdentifier, query]);

    useQueryEffect(loadAction, query, exception, [userIdentifier]);

    return [siteUser, loadAction];
}