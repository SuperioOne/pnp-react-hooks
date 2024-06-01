import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertID } from "../../utils/assert";
import { overrideAction } from "../createInvokable";
import { defaultCheckDisable, checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemAttachmentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

/**
 * Returns all attachments of the item.
 * @param itemId List item numeric Id. Changing the value resends request.
 * @param list List title or GUID Id string. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useAttachments refreshes response data when one of the dependencies changes.
 * @returns array of {@link IAttachmentInfo}.
 */
export function useAttachments(
  itemId: number,
  list: string,
  options?: ItemAttachmentsOptions,
  deps?: React.DependencyList,
): IAttachmentInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [attachments, setAttachments] = useState<
    IAttachmentInfo[] | undefined | null
  >();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertID(itemId, "itemId value is not valid.");
      const queryInst = resolveList(sp.web, list).items.getById(
        itemId,
      ).attachmentFiles;

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

  useQueryEffect(invokableFactory, setAttachments, _options, _mergedDeps);

  return attachments;
}
