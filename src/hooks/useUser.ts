import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveUser } from "../utils/resolveUser";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type UserOptions = PnpHookOptions<ODataQueryable>;

export function useUser(
    userId: number | string,
    options?: UserOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const [siteUser, setSiteUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const user = resolveUser(web.siteUsers, userId);

        return createInvokable(user);

    }, [userId]);

    const _mergedDeps = mergeDependencies([userId], deps);

    useQueryEffect(invokableFactory, setSiteUser, options, _mergedDeps);

    return siteUser;
}