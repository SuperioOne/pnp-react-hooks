import "@pnp/sp/items";
import { InternalContext } from "../../context/internalContext.js";
import { assertID } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ListItemOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/

/**
 * Returns an item from specified list item collection.
 *
 * @template T
 * @param {number} itemId - Item Id. Value is automatically tracked for changes.
 * @param {string} list - List GUID id or title. Value is automatically tracked for changes.
 * @param {ListItemOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {T | null |undefined}
 */
export function useListItem(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ T | null | undefined, Dispatch<SetStateAction<T | null |undefined>> ]} **/
  const [itemData, setItemData] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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
