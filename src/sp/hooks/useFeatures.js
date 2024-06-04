import "@pnp/sp/features/site";
import "@pnp/sp/features/web";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns site or web feature collection. Scope type can be defined in {@link FeaturesOptions.scope} property.
 *
 * @param {import("./options").FeaturesOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFeatures refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/features/types").IFeatureInfo[] | null |undefined}
 */
export function useFeatures(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/features/types").IFeatureInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/features/types").IFeatureInfo[] | null |undefined>>
   *  ]}
   **/
  const [features, setFeatures] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
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

  const mergedDeps = mergeDependencies([options?.scope], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setFeatures, internalOpts, mergedDeps);

  return features;
}
