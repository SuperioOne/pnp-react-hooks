import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ListsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IListInfo} from "@pnp/sp/lists" **/

/**
 *@param {SPFI} sp
 */
function listInfoRequest(sp) {
  return sp.web.lists;
}

/**
 * Returns list collection.
 *
 * @param {ListsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IListInfo[] | null | undefined}
 */
export function useLists(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IListInfo[] | null | undefined, Dispatch<SetStateAction<IListInfo[] | null |undefined>> ]} **/
  const [lists, setLists] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(listInfoRequest, setLists, internalOpts, deps);

  return lists;
}
