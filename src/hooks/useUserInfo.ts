import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { ErrorAction, Nullable, ODataQueryable, RequestAction, SPQuery } from "../types";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { insertODataQuery, resolveWeb } from "../utils";
import { useState, useCallback } from "react";

export interface UserQuery extends SPQuery, ODataQueryable { }

export function useUserInfo(
    userIdentifier: number | string,
    query?: UserQuery,
    exception?: ErrorAction): [Nullable<ISiteUserInfo>, RequestAction]
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

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
            else
            {
                return false;
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