import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/**
 *@param {import('@pnp/sp').SPFI} sp
 */
function webInfoRequest(sp) {
  return sp.web.webinfos;
}

/**
 * Returns web info collection of current web's subwebs.
 *
 * @param {import("./options.js").SubWebsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] useSubWebInfos refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/webs").IWebInfosData[] | null | undefined}
 */
export function useSubWebs(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/webs").IWebInfosData[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/webs").IWebInfosData[] | null |undefined>>
   *  ]}
   **/
  const [subWebs, setSubWebs] = useState();
  const internalOptions = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webInfoRequest, setSubWebs, internalOptions, deps);

  return subWebs;
}
