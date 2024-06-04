import "@pnp/sp/recycle-bin";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * Returns an item from recycle bin.
 *
 * @param {string} itemId - RecycleBin item guid ID. Changing the value resends request.
 * @param {import("./options").RecycleBinItemOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useRecycleBinItem refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject | null | undefined}
 */
export function useRecycleBinItem(itemId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/recycle-bin/types").IRecycleBinItemObject | null |undefined>>
   *  ]}
   **/
  const [binItem, setBinItem] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      if (!isUUID(itemId))
        throw new TypeError("itemId is not a valid GUID string.");

      switch (options?.scope) {
        case "site":
          return sp.site.recycleBin.getById(itemId);
        case "web":
        default:
          return sp.web.recycleBin.getById(itemId);
      }
    },
    [itemId, options?.scope],
  );

  const mergedDeps = mergeDependencies([itemId, options?.scope ?? "web"], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, itemId);
    return opt;
  }, [options, globalOptions, itemId]);

  useQueryEffect(requestFactory, setBinItem, internalOpts, mergedDeps);

  return binItem;
}
