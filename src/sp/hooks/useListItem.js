import "@pnp/sp/items";
import { InternalContext } from "../../context";
import { assertID } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns an item from specified list item collection.
 *
 * @template T
 * @param {number} itemId - Item Id. Changing the value resends request.
 * @param {string} list - List GUID id or title. Changing the value resends request.
 * @param {import("./options").ListItemOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useListItem refreshes response data when one of the dependencies changes.
 * @returns {T | null |undefined}
 */
export function useListItem(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    T | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>
   *  ]}
   **/
  const [itemData, setItemData] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      assertID(itemId, "itemId value is not valid.");
      return resolveList(sp.web, list).items.getById(itemId);
    },
    [itemId, list],
  );

  const mergedDeps = mergeDependencies([itemId, list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, itemId, list);

    return opt;
  }, [itemId, list, options, globalOptions]);

  useQueryEffect(requestFactory, setItemData, internalOpts, mergedDeps);

  return itemData;
}
