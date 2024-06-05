import "@pnp/sp/views";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns list view collection.
 *
 * @param {string} listId - List GUID id or title. Changing the value resends request.
 * @param {import("./options.js").ViewsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useViews refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/views").IViewInfo[] | null | undefined}
 */
export function useViews(listId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/views").IViewInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/views").IViewInfo[] | null |undefined>>
   *  ]}
   **/
  const [view, setView] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => {
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
