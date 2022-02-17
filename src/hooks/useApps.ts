import "@pnp/sp/appcatalog/web";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../utils/checkDisable";
import { createInvokable } from "../utils/createInvokable";
import { mergeOptions } from "../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

/**
 * @inheritDoc
 */
export type WebAppsOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns all app details from the app catalog.
 * @param options PnP hook options
 * @param deps useApps will resend request when one of the dependencies changed.
 * @returns App info array.
 */
export function useApps<T>(
    options?: WebAppsOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const globalOptions = useContext(InternalContext);
    const [apps, setApps] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) => createInvokable(sp.web.appcatalog), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [globalOptions, options]);

    useQueryEffect(invokableFactory, setApps, _options, deps);

    return apps;
}