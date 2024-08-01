import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {SubWebsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IWebInfosData} from "@pnp/sp/webs" **/

/**
 *@param {SPFI} sp
 */
function webInfoRequest(sp) {
  return sp.web.webinfos;
}

/**
 * Returns web info collection of current web's subwebs.
 *
 * @param {SubWebsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] Custom dependency list.
 * @returns {IWebInfosData[] | null | undefined}
 */
export function useSubWebs(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IWebInfosData[] | null | undefined, Dispatch<SetStateAction<IWebInfosData[] | null |undefined>> ]} **/
  const [subWebs, setSubWebs] = useState();
  const internalOptions = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webInfoRequest, setSubWebs, internalOptions, deps);

  return subWebs;
}
