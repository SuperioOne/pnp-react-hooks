import { DisableOptionValueType } from "../../types";
import { IListInfo } from "@pnp/sp/lists/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ListOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

/**
 * Return a list from list collection.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useList refreshes response data when one of the dependencies changes.
 */
export function useList(
  list: string,
  options?: ListOptions,
  deps?: React.DependencyList,
): IListInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [listInfo, setListInfo] = useState<IListInfo | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const queryInst = resolveList(sp.web, list);
      return createInvokable(queryInst);
    },
    [list],
  );

  const _mergedDeps = mergeDependencies([list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

    return opt;
  }, [list, options, globalOptions]);

  useQueryEffect(invokableFactory, setListInfo, _options, _mergedDeps);

  return listInfo;
}
