import "@pnp/sp/site-users";
import { ISiteUserInfo, ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isEmail } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
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
            let user: ISiteUser;

            switch (typeof userIdentifier)
            {
                case "number":
                    {
                        user = web.siteUsers.getById(userIdentifier);
                        break;
                    }
                case "string":
                    {
                        user = isEmail(userIdentifier)
                            ? web.siteUsers.getByEmail(userIdentifier)
                            : web.siteUsers.getByLoginName(userIdentifier);

                        break;
                    }
                default:
                    throw new ParameterError("useUser: userIdentifier value is not valid.", "userIdentifier", userIdentifier);
            }

            return createInvokable(user);
        }
        else
        {
            throw new ParameterError("useUser: userIdentifier value is empty.", "userIdentifier", userIdentifier);
        }
    }, [userIdentifier]);

    const mergedDeps = deps
        ? [userIdentifier].concat(deps)
        : [userIdentifier];

    useQueryEffect(invokableFactory, setSiteUser, options, mergedDeps);

    return siteUser;
}