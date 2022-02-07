import { sp } from "@pnp/sp";
import "@pnp/sp/profiles";
import { IProfiles } from "@pnp/sp/profiles/types";
import { Nullable } from "../types/utilityTypes";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";
import { CacheOptions, ExceptionOptions, RenderOptions } from "../types/options";

export interface ProfileOptions extends ExceptionOptions, RenderOptions, CacheOptions
{
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProfile<T extends Record<string, any>>(
    loginName: string,
    options?: ProfileOptions,
    deps?: React.DependencyList): Nullable<T>
{
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

    useQueryEffect(invokableFactory, setUserProfile, options, _mergedDeps);

    return userProfile;
}