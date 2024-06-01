import "@pnp/sp/comments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertID } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemCommentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

/**
 * Returns comment collection of specific list item.
 * @param itemId Item Id. Changing the value resends request.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useItemComments refreshes response data when one of the dependencies changes.
 */
export function useItemComments(
  itemId: number,
  list: string,
  options?: ItemCommentsOptions,
  deps?: React.DependencyList,
): ICommentInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [comments, setComments] = useState<ICommentInfo[] | undefined | null>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertID(itemId, "itemId value is not valid.");

      const queryInst = resolveList(sp.web, list).items.getById(
        itemId,
      ).comments;

      return overrideAction(queryInst);
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

  useQueryEffect(invokableFactory, setComments, _options, _mergedDeps);

  return comments;
}
