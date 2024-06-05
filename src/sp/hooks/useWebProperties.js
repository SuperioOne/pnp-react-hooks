import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @param {import('@pnp/sp').SPFI} sp **/
function webPropertiesRequest(sp) {
  return sp.web.allProperties;
}

/**
 * Returns web's properties.
 *
 * @template T
 * @param {import("./options.js").WebPropertiesOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useWebProperties refreshes response data when one of the dependencies changes.
 * @returns {T | null | undefined}
 */
export function useWebProperties(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    T | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>
   *  ]}
   **/
  const [properties, setProperties] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(webPropertiesRequest, setProperties, internalOpts, deps);

  return properties;
}
