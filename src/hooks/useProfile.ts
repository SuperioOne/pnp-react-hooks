import "@pnp/sp/profiles";
import { CacheOptions, ExceptionOptions, RenderOptions } from "../types/options";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IProfiles } from "@pnp/sp/profiles/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { sp } from "@pnp/sp";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ProfileOptions extends ExceptionOptions, RenderOptions, CacheOptions
{
    disabled?: DisableOptionValueType | { (loginName: string): boolean };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProfile<T extends Record<string, any>>(
    loginName: string,
    options?: ProfileOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [userProfile, setUserProfile] = useState<Nullable<T>>(undefined);

    const invokableFactory = useCallback(async () =>
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
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, loginName);

        return opt;
    }, [loginName, options, globalOptions]);

    useRequestEffect(invokableFactory, setUserProfile, _options, _mergedDeps);

    return userProfile;
}