import "@pnp/sp/regional-settings";
import { IRegionalSettingsInfo } from "@pnp/sp/regional-settings/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type RegionalSettingOptions = PnpHookOptions<ODataQueryableCollection>;

export function useRegionalSetting(
    options?: RegionalSettingOptions,
    deps?: React.DependencyList): Nullable<IRegionalSettingsInfo>
{
    const [regionalSetting, setRegionalSetting] = useState<Nullable<IRegionalSettingsInfo>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = web.regionalSettings;
        return createInvokable(queryInstance);
    }, []);

    useQueryEffect(invokableFactory, setRegionalSetting, options, deps);

    return regionalSetting;
}