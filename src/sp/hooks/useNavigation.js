import "@pnp/sp/navigation";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {NavigationOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {INavNodeInfo} from "@pnp/sp/navigation" **/

/**
 * Returns web navigation nodes.
 * Use {@link NavigationOptions.type} property to change navigation type.
 * Default is topNavigation.
 *
 * @param {NavigationOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {INavNodeInfo[] | null | undefined}
 */
export function useNavigation(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ INavNodeInfo[] | null | undefined, Dispatch<SetStateAction<INavNodeInfo[] | null |undefined>> ]} **/
  const [navNodes, setNavNodes] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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
