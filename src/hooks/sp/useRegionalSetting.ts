import "@pnp/sp/regional-settings";
import { IRegionalSettingsInfo } from "@pnp/sp/regional-settings/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type RegionalSettingOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns site regional settings.
 * @param options PnP hook options.
 * @param deps useRegionalSetting refreshes response data when one of the dependencies changes.
 */
export function useRegionalSetting(
    options?: RegionalSettingOptions,
    deps?: React.DependencyList): Nullable<IRegionalSettingsInfo>
{
    const globalOptions = useContext(InternalContext);
    const [regionalSetting, setRegionalSetting] = useState<Nullable<IRegionalSettingsInfo>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) => createInvokable(sp.web.regionalSettings), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setRegionalSetting, _options, deps);

    return regionalSetting;
}