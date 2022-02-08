import "@pnp/sp/appcatalog/web";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assert } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { defaultCheckDisable, checkDisable } from "../utils/checkDisable";
import { isUUID } from "../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

export interface WebAppOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (appId: string): boolean };
}

export function useApp<T>(
    appId: string,
    options?: WebAppOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [apps, setApps] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(isUUID(appId), "AppId is not a valid guid string.");

        return createInvokable(web.getAppCatalog().getAppById(appId));
    }, [appId]);

    const _mergedDeps = mergeDependencies([appId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, appId);

        return opt;
    }, [appId, options, globalOptions]);

    useQueryEffect(invokableFactory, setApps, _options, _mergedDeps);

    return apps;
}