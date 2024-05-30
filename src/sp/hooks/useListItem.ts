import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertID } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ListItemOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

/**
 * Returns an item from specified list item collection.
 * @param itemId Item Id. Changing the value resends request.
 * @param list List GUID id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useListItem refreshes response data when one of the dependencies changes.
 */
export function useListItem<T>(
  itemId: number,
  list: string,
  options?: ListItemOptions,
  deps?: React.DependencyList,
): T | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [itemData, setItemData] = useState<T | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertID(itemId, "itemId value is not valid.");

      const queryInst = resolveList(sp.web, list).items.getById(itemId);

      return createInvokable(queryInst);
    },
    [itemId, list],
  );

  const _mergedDeps = mergeDependencies([itemId, list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      itemId,
      list,
    );

    return opt;
  }, [itemId, list, options, globalOptions]);

  useQueryEffect(invokableFactory, setItemData, _options, _mergedDeps);

  return itemData;
}
