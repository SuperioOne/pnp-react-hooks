import "@pnp/sp/appcatalog/web";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

export type WebAppsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useApps<T>(
    options?: WebAppsOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const globalOptions = useContext(InternalContext);
    const [apps, setApps] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.getAppCatalog()), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);
        
        return opt;
    }, [globalOptions, options]);

    useQueryEffect(invokableFactory, setApps, _options, deps);

    return apps;
}