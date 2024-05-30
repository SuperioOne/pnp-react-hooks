import { IWebInfosData } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type SubWebsOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns web info collection of current web's subwebs.
 * @param options PnP hook options.
 * @param deps useSubWebInfos refreshes response data when one of the dependencies changes.
 */
export function useSubWebs(
  options?: SubWebsOptions,
  deps?: React.DependencyList,
): IWebInfosData[] | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [subWebs, setSubWebs] = useState<IWebInfosData[] | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web.webinfos),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setSubWebs, _options, deps);

  return subWebs;
}
