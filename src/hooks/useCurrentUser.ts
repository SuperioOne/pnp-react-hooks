import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

export function useCurrentUser(
    options?: CurrentUserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [currentUser, setCurrentUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invocableFactory = useCallback(async (web: IWeb) => createInvokable(web.currentUser), []);

    useQueryEffect(invocableFactory, setCurrentUser, options, deps);

    return currentUser;
}