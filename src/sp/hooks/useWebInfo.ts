import { IWebInfo } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type WebInfoOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns current web.
 * @param options PnP hook options.
 * @param deps useWebInfo refreshes response data when one of the dependencies changes.
 */
export function useWebInfo(
  options?: WebInfoOptions,
  deps?: React.DependencyList,
): Nullable<IWebInfo> {
  const globalOptions = useContext(InternalContext);
  const [webInfo, setWebInfo] = useState<Nullable<IWebInfo>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setWebInfo, _options, deps);

  return webInfo;
}

