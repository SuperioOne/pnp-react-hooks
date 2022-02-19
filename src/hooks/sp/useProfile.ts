import "@pnp/sp/profiles";
import { BehaviourOptions } from "../../types/options/BehaviourOptions";
import { ContextOptions, ErrorOptions, RenderOptions } from "../../types/options";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IProfiles } from "@pnp/sp/profiles/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ProfileOptions extends ErrorOptions, RenderOptions, BehaviourOptions, ContextOptions
{
    disabled?: DisableOptionValueType | { (loginName: string): boolean };
}

/**
 * Returns an user profile for specified login name.
 * @param loginName User login name. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useProfile will resend request when one of the dependencies changed.
 */
export function useProfile<T>(
    loginName: string,
    options?: ProfileOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [userProfile, setUserProfile] = useState<Nullable<T>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const action = function (this: IProfiles)
        {
            return this.getPropertiesFor(loginName);
        };

        return createInvokable(sp.profiles, action);
    }, [loginName]);

    const _mergedDeps = mergeDependencies([loginName], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions<undefined>(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, loginName);

        return opt;
    }, [loginName, options, globalOptions]);

    useQueryEffect(invokableFactory, setUserProfile, _options, _mergedDeps);

    return userProfile;
}