import "@pnp/sp/recycle-bin";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/**
 * Returns all recycle bin items.
 *
 * @param {import("./options.js").RecycleBinItemsOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useRecycleBinItems refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/recycle-bin/types.js").IRecycleBinItemObject[] | null | undefined}
 */
export function useRecycleBinItems(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/recycle-bin/types.js").IRecycleBinItemObject[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/recycle-bin/types.js").IRecycleBinItemObject[] | null |undefined>>
   *  ]}
   **/
  const [binItems, setBinItems] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      switch (options?.scope) {
        case "site":
          return sp.site.recycleBin;
        case "web":
        default:
          return sp.web.recycleBin;
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

  useQueryEffect(requestFactory, setBinItems, internalOpts, mergedDeps);

  return binItems;
}
