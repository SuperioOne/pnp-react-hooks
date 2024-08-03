import "@pnp/sp/views";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { isUUID } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ViewOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IViewInfo} from "@pnp/sp/views" **/

/**
 * Returns a list view.
 *
 * @param {string} listId - List GUID id or title. Value is automatically tracked for changes.
 * @param {string} [viewId] - View title or view GUID id. Value is automatically tracked for changes.
 * @param {ViewOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IViewInfo | null | undefined}
 */
export function useView(listId, viewId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IViewInfo | null | undefined, Dispatch<SetStateAction<IViewInfo | null |undefined>> ]} **/
  const [view, setView] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => {
      const spList = resolveList(sp.web, listId);

      switch (typeof viewId) {
        case "string": {
          return isUUID(viewId)
            ? spList.views.getById(viewId)
            : spList.views.getByTitle(viewId);
        }
        case "undefined":
          return spList.defaultView;
        default:
          throw new TypeError("viewId value type is not string or undefined.");
      }
    },
    [listId, viewId],
  );

  const mergedDeps = mergeDependencies([listId, viewId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, listId, viewId);

    return opt;
  }, [listId, viewId, globalOptions, options]);

  useQueryEffect(requestFactory, setView, internalOpts, mergedDeps);

  return view;
}
