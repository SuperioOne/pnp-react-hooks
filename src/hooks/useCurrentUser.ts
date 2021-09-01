import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import useQueryEffect from "./internal/useQuery";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs";
import { Nullable, ODataQueryable, PnpHookOptions, CacheOptions } from "../types";
import { useState, useCallback } from "react";

export interface CurrentUserInfoOptions extends PnpHookOptions<ODataQueryable>, CacheOptions { }

export function useCurrentUser(
    options?: CurrentUserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [currentUser, setCurrentUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const loadAction = useCallback((web: IWeb) => web.currentUser, []);

    useQueryEffect(loadAction, setCurrentUser, options, deps);

    return currentUser;
}