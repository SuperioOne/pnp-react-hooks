import { IWebInfosData } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
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
): Nullable<IWebInfosData[]> {
  const globalOptions = useContext(InternalContext);
  const [subWebs, setSubWebs] = useState<Nullable<IWebInfosData[]>>();

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

