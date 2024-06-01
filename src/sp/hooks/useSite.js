import "@pnp/sp/sites";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { SPFI } from "@pnp/sp";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/**
 * @param {SPFI} sp
 * @returns  {import("@pnp/sp/sites").ISite}
 */
function siteInfoRequest(sp) {
  return sp.site;
}

/**
 * Returns current site info.
 * @param {import("./options").SiteInfoOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSite refreshes response data when one of the dependencies changes.
 * @returns { import("@pnp/sp/sites/types").ISiteInfo | null | undefined}
 */
export function useSite(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/sites/types").ISiteInfo | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/sites/types").ISiteInfo | null |undefined>>]} **/
  const [siteInfo, setSiteInfo] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(siteInfoRequest, setSiteInfo, internalOpts, deps);

  return siteInfo;
}
