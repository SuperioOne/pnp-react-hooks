import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/**
 *@param {SPFI} sp
 */
function listInfoRequest(sp) {
  return sp.web.lists;
}

/**
 * Returns list collection.
 * @param {import("./options").ListsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useLists refreshes response data when one of the dependencies changes.
 * @returns { import("@pnp/sp/lists").IListInfo[] | null | undefined}
 */
export function useLists(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/lists").IListInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/lists").IListInfo[] | null |undefined>>]} **/
  const [lists, setLists] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(listInfoRequest, setLists, internalOpts, deps);

  return lists;
}
