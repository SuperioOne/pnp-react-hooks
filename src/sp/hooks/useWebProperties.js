import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

/** @param {SPFI} sp **/
function webPropertiesRequest(sp) {
  return sp.web.allProperties;
}

/**
 * Returns web's properties.
 *
 * @template T
 * @param {import("./options").WebPropertiesOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useWebProperties refreshes response data when one of the dependencies changes.
 * @returns {T | null | undefined}
 */
export function useWebProperties(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[T | null | undefined, import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>]} **/
  const [properties, setProperties] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webPropertiesRequest, setProperties, internalOpts, deps);

  return properties;
}
