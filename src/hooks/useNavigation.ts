import "@pnp/sp/navigation";
import { useQueryEffect } from "./internal/useQueryEffect";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { IWeb } from "@pnp/sp/webs/types";
import { NavigationTypes, Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export interface NavigationOptions extends PnpHookOptions<ODataQueryableCollection>
{
    type?: NavigationTypes;
}

export function useNavigation(
    options?: NavigationOptions,
    deps?: React.DependencyList): Nullable<Array<INavNodeInfo>>
{
    const [navigationNodes, setNavigationNodes] = useState<Nullable<Array<INavNodeInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
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

    const mergedDeps = deps
        ? [options?.type].concat(deps)
        : [options?.type];

    useQueryEffect(invokableFactory, setNavigationNodes, options, mergedDeps);

    return navigationNodes;
}