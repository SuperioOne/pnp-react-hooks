import "@pnp/sp/sites";
import { PnpHookOptions } from "../../types/options";
import { ISiteInfo } from "../../types/ISiteInfo";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { createInvokable } from "../createInvokable";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { SPFI } from "@pnp/sp";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type SiteInfoOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns current site info.
 * @param options PnP hook options.
 * @param deps useSite refreshes response data when one of the dependencies changes.
 */
export function useSite(
  options?: SiteInfoOptions,
  deps?: React.DependencyList,
): Nullable<ISiteInfo> {
  const globalOptions = useContext(InternalContext);
  const [siteInfo, setSiteInfo] = useState<Nullable<ISiteInfo>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.site),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setSiteInfo, _options, deps);

  return siteInfo;
}

