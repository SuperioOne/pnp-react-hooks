import "@pnp/sp/recycle-bin";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {RecycleBinItemsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IRecycleBinItemObject} from "@pnp/sp/recycle-bin/types.js" **/

/**
 * Returns all recycle bin items.
 *
 * @param {RecycleBinItemsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IRecycleBinItemObject[] | null | undefined}
 */
export function useRecycleBinItems(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IRecycleBinItemObject[] | null | undefined, Dispatch<SetStateAction<IRecycleBinItemObject[] | null |undefined>> ]} **/
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

  const mergedDeps = mergeDependencies([options?.scope ?? "web"], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);
    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setBinItems, internalOpts, mergedDeps);

  return binItems;
}
