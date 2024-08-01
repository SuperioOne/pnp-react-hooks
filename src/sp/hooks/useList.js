import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ListOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IListInfo} from "@pnp/sp/lists" **/

/**
 * Return a list from list collection.
 *
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {ListOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IListInfo | null | undefined}
 */
export function useList(list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IListInfo | null | undefined, Dispatch<SetStateAction<IListInfo | null |undefined>> ]} **/
  const [listInfo, setListInfo] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => resolveList(sp.web, list),
    [list],
  );

  const mergedDeps = mergeDependencies([list], deps);
  const internaOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, list);

    return opt;
  }, [list, options, globalOptions]);

  useQueryEffect(requestFactory, setListInfo, internaOpts, mergedDeps);

  return listInfo;
}
