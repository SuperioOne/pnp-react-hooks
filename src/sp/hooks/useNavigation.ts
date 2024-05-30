import "@pnp/sp/navigation";
import { INavNodeInfo } from "@pnp/sp/navigation/types";
import { InternalContext } from "../../context";
import { NavigationTypes } from "../../types/literalTypes";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface NavigationOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * Navigation type. Default is 'topNavigation'. Changing the type
   * resends request.
   */
  type?: NavigationTypes;
}

/**
 * Returns web navigation nodes.
 * Use {@link NavigationOptions.type} property to change navigation type.
 * Default is topNavigation.
 * @param options PnP hook options.
 * @param deps useNavigation refreshes response data when one of the dependencies changes.
 */
export function useNavigation(
  options?: NavigationOptions,
  deps?: React.DependencyList,
): Nullable<INavNodeInfo[]> {
  const globalOptions = useContext(InternalContext);
  const [navNodes, setNavNodes] = useState<Nullable<INavNodeInfo[]>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      switch (options?.type) {
        case "quickLaunch":
          return createInvokable(sp.web.navigation.quicklaunch);
        case "topNavigation":
        default:
          return createInvokable(sp.web.navigation.topNavigationBar);
      }
    },
    [options?.type],
  );

  const _mergedDeps = mergeDependencies([options?.type], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setNavNodes, _options, _mergedDeps);

  return navNodes;
}

