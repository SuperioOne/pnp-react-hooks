import "@pnp/sp/navigation";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { NavigationTypes } from "../types/literalTypes";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface NavigationOptions extends PnpHookOptions<ODataQueryableCollection>
{
    type?: NavigationTypes;
}

export function useNavigation(
    options?: NavigationOptions,
    deps?: React.DependencyList): Nullable<INavNodeInfo[]>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setNavNodes, _options, _mergedDeps);

    return navNodes;
}