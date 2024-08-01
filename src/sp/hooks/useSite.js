import "@pnp/sp/sites";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {SiteInfoOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISite} from "@pnp/sp/sites" **/
/** @import {ISiteInfo} from "@pnp/sp/sites/types.js" **/

/**
 * @param {SPFI} sp
 * @returns {ISite}
 */
function siteInfoRequest(sp) {
  return sp.site;
}

/**
 * Returns current site info.
 * @param {SiteInfoOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteInfo | null | undefined}
 */
export function useSite(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteInfo | null | undefined, Dispatch<SetStateAction<ISiteInfo | null |undefined>> ]} **/
  const [siteInfo, setSiteInfo] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(siteInfoRequest, setSiteInfo, internalOpts, deps);

  return siteInfo;
}
