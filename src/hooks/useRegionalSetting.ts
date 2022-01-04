import "@pnp/sp/regional-settings";
import { IRegionalSettingsInfo } from "@pnp/sp/regional-settings/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type RegionalSettingOptions = PnpHookOptions<ODataQueryable>;

export function useRegionalSetting(
    options?: RegionalSettingOptions,
    deps?: React.DependencyList): Nullable<IRegionalSettingsInfo>
{
    const [regionalSetting, setRegionalSetting] = useState<Nullable<IRegionalSettingsInfo>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.regionalSettings), []);

    useQueryEffect(invokableFactory, setRegionalSetting, options, deps);

    return regionalSetting;
}