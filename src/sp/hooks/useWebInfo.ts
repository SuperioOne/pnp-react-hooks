import { IWebInfo } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
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
): IWebInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [webInfo, setWebInfo] = useState<IWebInfo | null | undefined>();

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
