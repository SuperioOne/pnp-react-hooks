import "@pnp/sp/views";
import { DisableOptionValueType } from "../../types";
import { IViewInfo } from "@pnp/sp/views/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ViewsOptions extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (listId: string): boolean };
}

/**
 * Returns list view collection.
 * @param listId List GUID id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useViews refreshes response data when one of the dependencies changes.
 */
export function useViews(
  listId: string,
  options?: ViewsOptions,
  deps?: React.DependencyList,
): IViewInfo[] | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [view, setView] = useState<IViewInfo[] | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const spList = resolveList(sp.web, listId);
      return createInvokable(spList.views);
    },
    [listId],
  );

  const _mergedDeps = mergeDependencies([listId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, listId);

    return opt;
  }, [listId, globalOptions, options]);

  useQueryEffect(invokableFactory, setView, _options, _mergedDeps);

  return view;
}
