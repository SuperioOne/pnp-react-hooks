import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {WebPropertiesOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/

/** @param {SPFI} sp **/
function webPropertiesRequest(sp) {
  return sp.web.allProperties;
}

/**
 * Returns web's properties.
 *
 * @template T
 * @param {WebPropertiesOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {T | null | undefined}
 */
export function useWebProperties(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ T | null | undefined, Dispatch<SetStateAction<T | null |undefined>> ]} **/
  const [properties, setProperties] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webPropertiesRequest, setProperties, internalOpts, deps);

  return properties;
}
