import "@pnp/sp/navigation";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { IWeb } from "@pnp/sp/webs/types";
import { NavigationTypes } from "../types/literalTypes";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export interface NavigationOptions extends PnpHookOptions<ODataQueryableCollection>
{
    type?: NavigationTypes;
}

export function useNavigation(
    options?: NavigationOptions,
    deps?: React.DependencyList): Nullable<INavNodeInfo[]>
{
    const [navNodes, setNavNodes] = useState<Nullable<INavNodeInfo[]>>();

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