import "@pnp/sp/sites";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/**
 * @param {import('@pnp/sp').SPFI} sp
 * @returns  {import("@pnp/sp/sites").ISite}
 */
function siteInfoRequest(sp) {
  return sp.site;
}

/**
 * Returns current site info.
 * @param {import("./options.js").SiteInfoOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSite refreshes response data when one of the dependencies changes.
 * @returns { import("@pnp/sp/sites/types.js").ISiteInfo | null | undefined}
 */
export function useSite(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/sites/types.js").ISiteInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/sites/types.js").ISiteInfo | null |undefined>>
   *  ]}
   **/
  const [siteInfo, setSiteInfo] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(siteInfoRequest, setSiteInfo, internalOpts, deps);

  return siteInfo;
}
