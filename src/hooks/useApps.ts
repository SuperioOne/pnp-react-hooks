import "@pnp/sp/appcatalog/web";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useCallback, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

export type WebAppsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useApps<T>(
    options?: WebAppsOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const [apps, setApps] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.getAppCatalog()), []);

    useQueryEffect(invokableFactory, setApps, options, deps);

    return apps;
}