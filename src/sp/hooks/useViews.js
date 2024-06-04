import "@pnp/sp/views";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns list view collection.
 *
 * @param {string} listId - List GUID id or title. Changing the value resends request.
 * @param {import("./options").ViewsOptions} [options] - PnP hook options.
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
