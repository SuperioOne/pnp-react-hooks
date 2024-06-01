import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/** @param {SPFI} sp **/
function webRequest(sp) {
  return sp.web;
}

/**
 * Returns current web.
 *
 * @param {import("./options").WebInfoOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useWebInfo refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/webs").IWebInfo | null | undefined}
 */
export function useWebInfo(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/webs").IWebInfo | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/webs").IWebInfo | null |undefined>>]} **/
  const [webInfo, setWebInfo] = useState();
  const InternalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webRequest, setWebInfo, InternalOpts, deps);

  return webInfo;
}
