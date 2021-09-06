import "@pnp/sp/navigation";
import useQueryEffect from "./internal/useQuery";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export interface NavigationOptions extends PnpHookOptions<ODataQueryableCollection & ODataQueryable>
{
    type?: "topNavigation" | "quickLaunch";
}

export function useNavigation(
    options?: NavigationOptions,
    deps?: React.DependencyList): Nullable<Array<INavNodeInfo>>
{
    const [itemData, setItemData] = useState<Nullable<Array<INavNodeInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        switch (options?.type)
        {
            case "quickLaunch":
                return createInvokable(web.navigation.quicklaunch);
            default:
                return createInvokable(web.navigation.topNavigationBar);
        }

    }, [options?.type]);

    const mergedDeps = deps
        ? [options?.type, ...deps]
        : [options?.type];

    useQueryEffect(invokableFactory, setItemData, options, mergedDeps);

    return itemData;
}