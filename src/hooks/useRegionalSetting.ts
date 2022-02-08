import "@pnp/sp/regional-settings";
import { IRegionalSettingsInfo } from "@pnp/sp/regional-settings/types";
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

export type RegionalSettingOptions = PnpHookOptions<ODataQueryable>;

export function useRegionalSetting(
    options?: RegionalSettingOptions,
    deps?: React.DependencyList): Nullable<IRegionalSettingsInfo>
{
    const globalOptions = useContext(InternalContext);
    const [regionalSetting, setRegionalSetting] = useState<Nullable<IRegionalSettingsInfo>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.regionalSettings), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setRegionalSetting, _options, deps);

    return regionalSetting;
}