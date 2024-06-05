import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Return a list from list collection.
 *
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options.js").ListOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useList refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/lists").IListInfo | null | undefined}
 */
export function useList(list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/lists").IListInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/lists").IListInfo | null |undefined>>
   *  ]}
   **/
  const [listInfo, setListInfo] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => resolveList(sp.web, list),
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
