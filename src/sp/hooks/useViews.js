import "@pnp/sp/views";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ViewsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IViewInfo} from "@pnp/sp/views" **/

/**
 * Returns list view collection.
 *
 * @param {string} listId - List GUID id or title. Value is automatically tracked for changes.
 * @param {ViewsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IViewInfo[] | null | undefined}
 */
export function useViews(listId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IViewInfo[] | null | undefined, Dispatch<SetStateAction<IViewInfo[] | null |undefined>> ]} **/
  const [view, setView] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => {
      const spList = resolveList(sp.web, listId);
      return spList.views;
    },
    [listId],
  );

  const mergedDeps = mergeDependencies([listId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, listId);

    return opt;
  }, [listId, globalOptions, options]);

  useQueryEffect(requestFactory, setView, internalOpts, mergedDeps);

  return view;
}
