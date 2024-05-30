import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { createInvokable } from "../createInvokable";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

export type WebPropertiesOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns web's properties.
 * @param options PnP hook options.
 * @param deps useWebProperties refreshes response data when one of the dependencies changes.
 */
export function useWebProperties<T>(
  options?: WebPropertiesOptions,
  deps?: React.DependencyList,
): T | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [properties, setProperties] = useState<T | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web.allProperties),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setProperties, _options, deps);

  return properties;
}
