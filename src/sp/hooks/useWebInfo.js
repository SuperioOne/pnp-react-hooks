import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {WebInfoOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IWebInfo} from "@pnp/sp/webs" **/

/** @param {SPFI} sp **/
function webRequest(sp) {
  return sp.web;
}

/**
 * Returns current web.
 *
 * @param {WebInfoOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IWebInfo | null | undefined}
 */
export function useWebInfo(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IWebInfo | null | undefined, Dispatch<SetStateAction<IWebInfo | null |undefined>> ]} **/
  const [webInfo, setWebInfo] = useState();
  const InternalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webRequest, setWebInfo, InternalOpts, deps);

  return webInfo;
}
