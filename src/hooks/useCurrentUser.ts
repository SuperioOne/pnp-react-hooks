import "@pnp/sp/site-users";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

export function useCurrentUser(
    options?: CurrentUserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [currentUser, setCurrentUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invocableFactory = useCallback((web: IWeb) => createInvokable(web.currentUser), []);

    useQueryEffect(invocableFactory, setCurrentUser, options, deps);

    return currentUser;
}