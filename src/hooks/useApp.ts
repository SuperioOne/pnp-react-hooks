import "@pnp/sp/appcatalog/web";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assert } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { isUUID } from "../utils/isUUID";
import { mergeDependencies } from "../utils/mergeDependencies";
import { useCallback, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

export type WebAppOptions = PnpHookOptions<ODataQueryable>;

export function useApp<T>(
    appId: string,
    options?: WebAppOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [apps, setApps] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(isUUID(appId), "AppId is not a valid guid string.");

        return createInvokable(web.getAppCatalog().getAppById(appId));
    }, [appId]);

    const _mergedDeps = mergeDependencies([appId], deps);

    useQueryEffect(invokableFactory, setApps, options, _mergedDeps);

    return apps;
}