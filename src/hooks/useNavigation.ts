import "@pnp/sp/navigation";
import { useQueryEffect } from "./internal/useQueryEffect";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { IWeb } from "@pnp/sp/webs/types";
import { NavigationTypes, Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, mergeDependencies } from "../utils";
import { useState, useCallback } from "react";

export interface NavigationOptions extends PnpHookOptions<ODataQueryableCollection>
{
    type?: NavigationTypes;
}

export function useNavigation(
    options?: NavigationOptions,
    deps?: React.DependencyList): Nullable<Array<INavNodeInfo>>
{
    const [navNodes, setNavNodes] = useState<Nullable<Array<INavNodeInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        switch (options?.type)
        {
            case "quickLaunch":
                {
                    return createInvokable(web.navigation.quicklaunch);
                }
            default:
                {
                    return createInvokable(web.navigation.topNavigationBar);
                }
        }

    }, [options?.type]);

    const _mergedDeps = mergeDependencies([options?.type], deps);

    useQueryEffect(invokableFactory, setNavNodes, options, _mergedDeps);

    return navNodes;
}