import "@pnp/sp/navigation";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns web navigation nodes.
 * Use {@link NavigationOptions.type} property to change navigation type.
 * Default is topNavigation.
 *
 * @param {import("./options.js").NavigationOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useNavigation refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/navigation").INavNodeInfo[] | null | undefined}
 */
export function useNavigation(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/navigation").INavNodeInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/navigation").INavNodeInfo[] | null |undefined>>
   *  ]}
   **/
  const [navNodes, setNavNodes] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      switch (options?.type) {
        case "quickLaunch":
          return sp.web.navigation.quicklaunch;
        case "topNavigation":
        default:
          return sp.web.navigation.topNavigationBar;
      }
    },
    [options?.type],
  );

  const mergedDeps = mergeDependencies(
    [options?.type ?? "topNavigation"],
    deps,
  );
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setNavNodes, internalOpts, mergedDeps);

  return navNodes;
}
