import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

export function useCurrentUser(
    options?: CurrentUserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [currentUser, setCurrentUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invocableFactory = useCallback(async (web: IWeb) => createInvokable(web.currentUser), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invocableFactory, setCurrentUser, _options, deps);

    return currentUser;
}