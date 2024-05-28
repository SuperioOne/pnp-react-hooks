import "@pnp/sp/appcatalog/web";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";
import { AppCatalogScopes } from "../../types/literalTypes";

/**
 * @inheritDoc
 */
export interface WebAppsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    scope?: AppCatalogScopes;
}

/**
 * Returns app detail collection from the app catalog.
 * @param options PnP hook options
 * @param deps useApps refreshes response data when one of the dependencies changes.
 * @returns App info array.
 */
export function useApps<T>(
    options?: WebAppsOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const globalOptions = useContext(InternalContext);
    const [apps, setApps] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        return options?.scope === "tenant"
            ? createInvokable(sp.tenantAppcatalog)
            : createInvokable(sp.web.appcatalog);
    }, [options?.scope]);

    const _mergedDeps = mergeDependencies([options?.scope], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [globalOptions, options]);

    useQueryEffect(invokableFactory, setApps, _options, _mergedDeps);

    return apps;
}