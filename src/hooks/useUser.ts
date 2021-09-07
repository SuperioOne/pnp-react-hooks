import "@pnp/sp/site-users";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type UserOptions = PnpHookOptions<ODataQueryable>;

export function useUser(
    userIdentifier: number | string,
    options?: UserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (userIdentifier)
        {
            const queryInstance = typeof userIdentifier === "number"
                ? web.siteUsers.getById(userIdentifier)
                : web.siteUsers.getByEmail(userIdentifier);

            return createInvokable(queryInstance, queryInstance.defaultAction);
        }
        else
        {
            throw new ParameterError("useUser: userIdentifier value is not valid.", "userIdentifier", userIdentifier);
        }
    }, [userIdentifier]);

    const mergedDeps = deps
        ? [userIdentifier, ...deps]
        : [userIdentifier];

    useQueryEffect(invokableFactory, setSiteUser, options, mergedDeps);

    return siteUser;
}