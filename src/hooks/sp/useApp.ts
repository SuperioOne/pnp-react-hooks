import "@pnp/sp/appcatalog/web";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { assert } from "../../utils/assert";
import { createInvokable } from "../../utils/createInvokable";
import { defaultCheckDisable, checkDisable } from "../../utils/checkDisable";
import { isUUID } from "../../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * @inheritDoc
 */
export interface WebAppOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (appId: string): boolean; };
}

/**
 * Returns an app detail of the given Id from the app catalog.
 * @param appId App GUID Id string. Changing the appId value resends request.
 * @param options PnP hook options
 * @param deps useApp refreshes response data when one of the dependencies changes.
 * @returns App info object.
 */
export function useApp<T>(
    appId: string,
    options?: WebAppOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [apps, setApps] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assert(isUUID(appId), "AppId is not a valid guid string.");
        return createInvokable(sp.web.appcatalog.getAppById(appId));
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