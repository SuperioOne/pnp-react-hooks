import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {FeaturesOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IFeatureInfo} from "@pnp/sp/features" **/

/**
 * Returns site or web feature collection. Scope type can be defined in `FeaturesOptions.scope` property.
 *
 * @param {FeaturesOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFeatureInfo[] | null |undefined}
 */
export function useFeatures(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFeatureInfo[] | null | undefined, Dispatch<SetStateAction<IFeatureInfo[] | null |undefined>> ]} **/
  const [features, setFeatures] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      switch (options?.scope) {
        case "site": {
          return sp.site.features;
        }
        case "web":
        default: {
          return sp.web.features;
        }
      }
    },
    [options?.scope],
  );

  const mergedDeps = mergeDependencies([options?.scope ?? "web"], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setFeatures, internalOpts, mergedDeps);

  return features;
}
