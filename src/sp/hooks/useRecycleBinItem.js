import "@pnp/sp/recycle-bin";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { isUUID } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RecycleBinItemOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRecycleBinItemObject} from "@pnp/sp/recycle-bin/types.js" **/

/**
 * Returns an item from recycle bin.
 *
 * @param {string} itemId - RecycleBin item guid ID. Value is automatically tracked for changes.
 * @param {RecycleBinItemOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRecycleBinItemObject | null | undefined}
 */
export function useRecycleBinItem(itemId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRecycleBinItemObject | null | undefined, Dispatch<SetStateAction<IRecycleBinItemObject | null |undefined>> ]} **/
  const [binItem, setBinItem] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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
