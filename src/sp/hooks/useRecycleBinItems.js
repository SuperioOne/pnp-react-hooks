import "@pnp/sp/recycle-bin";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection, RecycleBinScopes } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export interface RecycleBinItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  scope?: RecycleBinScopes;
}

/**
 * Returns all recycle bin items.
 * @param options Pnp hook options.
 * @param deps useRecycleBinItems refreshes response data when one of the dependencies changes.
 */
export function useRecycleBinItems(
  options?: RecycleBinItemsOptions,
  deps?: React.DependencyList,
): IRecycleBinItemObject[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [binItems, setBinItems] = useState<
    IRecycleBinItemObject[] | undefined | null
  >(undefined);

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      switch (options?.scope) {
        case "site":
          return overrideAction(sp.site.recycleBin);
        case "web":
        default:
          return overrideAction(sp.web.recycleBin);
      }
    },
    [options?.scope],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);
    return opt;
  }, [options, globalOptions]);

  const _mergedDeps = mergeDependencies([options?.scope], deps);

  useQueryEffect(invokableFactory, setBinItems, _options, _mergedDeps);

  return binItems;
}
