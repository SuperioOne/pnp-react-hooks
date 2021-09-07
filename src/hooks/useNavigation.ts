import "@pnp/sp/navigation";
import useQueryEffect from "./internal/useQuery";
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
                    const queryInstance = web.navigation.quicklaunch;
                    return createInvokable(queryInstance, queryInstance.defaultAction);
                }
            default:
                {
                    const queryInstance = web.navigation.topNavigationBar;
                    return createInvokable(queryInstance, queryInstance.defaultAction);
                }
        }

    }, [options?.type]);

    const mergedDeps = deps
        ? [options?.type, ...deps]
        : [options?.type];

    useQueryEffect(invokableFactory, setNavigationNodes, options, mergedDeps);

    return navigationNodes;
}