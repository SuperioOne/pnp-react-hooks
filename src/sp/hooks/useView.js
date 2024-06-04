import "@pnp/sp/views";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns a list view.
 *
 * @param {string} listId - List GUID id or title. Changing the value resends request.
 * @param {string} [viewId] - View title or view GUID id.
 * @param {import("./options").ViewOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useView refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/views").IViewInfo | null | undefined}
 */
export function useView(listId, viewId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/views").IViewInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/views").IViewInfo | null |undefined>>
   *  ]}
   **/
  const [view, setView] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => {
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
