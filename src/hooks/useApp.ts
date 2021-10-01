import "@pnp/sp/appcatalog/web";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { assert, createInvokable, isUUID, mergeDependencies } from "../utils";
import { useCallback, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";
import { WebAppsOptions } from "./useApps";

export type WebAppOptions = PnpHookOptions<ODataQueryable>;

export function useApp<T>(
    appId: string,
    options?: WebAppsOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [apps, setApps] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(isUUID(appId), "AppId is not a valid.");

        return createInvokable(web.getAppCatalog().getAppById(appId));
    }, [appId]);

    const _mergedDeps = mergeDependencies([appId], deps);

    useQueryEffect(invokableFactory, setApps, options, _mergedDeps);

    return apps;
}