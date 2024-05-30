import "@pnp/sp/recycle-bin";
import { DisableOptionValueType } from "../../types";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { ODataQueryable, RecycleBinScopes } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export interface RecycleBinItemOptions extends PnpHookOptions<ODataQueryable> {
  scope?: RecycleBinScopes;
  disabled?: DisableOptionValueType | { (itemId: string): boolean };
}

/**
 * Returns an item from recycle bin.
 * @param itemId RecycleBin item guid ID. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useRecycleBinItem refreshes response data when one of the dependencies changes.
 */
export function useRecycleBinItem(
  itemId: string,
  options?: RecycleBinItemOptions,
  deps?: React.DependencyList,
): IRecycleBinItemObject | null | undefined {
  const [binItem, setBinItem] = useState<
    IRecycleBinItemObject | null | undefined
  >();
  const globalOptions = useContext(InternalContext);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, itemId);
    return opt;
  }, [options, globalOptions, itemId]);

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      if (!isUUID(itemId))
        throw new TypeError("itemId is not a valid GUID string.");

      switch (options?.scope) {
        case "site":
          return createInvokable(sp.site.recycleBin.getById(itemId));
        case "web":
        default:
          return createInvokable(sp.web.recycleBin.getById(itemId));
      }
    },
    [itemId, options?.scope],
  );

  const _mergedDeps = mergeDependencies([itemId, options?.scope], deps);

  useQueryEffect(invokableFactory, setBinItem, _options, _mergedDeps);

  return binItem;
}
