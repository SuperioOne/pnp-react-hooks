import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../utils/checkDisable";
import { createInvokable } from "../utils/createInvokable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns current user information.
 * @param options PnP hook options
 * @param deps useCurrentUser will resend request when one of the dependencies changed.
 */
export function useCurrentUser(
    options?: CurrentUserInfoOptions,
    deps?: React.DependencyList): Nullable<ISiteUserInfo>
{
    const globalOptions = useContext(InternalContext);
    const [currentUser, setCurrentUser] = useState<Nullable<ISiteUserInfo>>(undefined);

    const invocableFactory = useCallback(async (sp: SPFI) => createInvokable(sp.web.currentUser), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invocableFactory, setCurrentUser, _options, deps);

    return currentUser;
}