import "@pnp/sp/sites";
import { PnpHookOptions } from "../types";
import { ISiteInfo } from "../types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
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
): ISiteInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [siteInfo, setSiteInfo] = useState<ISiteInfo | null | undefined>();

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
