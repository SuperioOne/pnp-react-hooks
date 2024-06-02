import "@pnp/sp/recycle-bin";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * Returns all recycle bin items.
 *
 * @param {import("./options").RecycleBinItemsOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useRecycleBinItems refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject[] | null | undefined}
 */
export function useRecycleBinItems(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject[] | null |undefined>>]} **/
  const [binItems, setBinItems] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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

  const mergedDeps = mergeDependencies([options?.scope], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);
    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setBinItems, internalOpts, mergedDeps);

  return binItems;
}
