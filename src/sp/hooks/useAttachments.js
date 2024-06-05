import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { assertID } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns all attachments of the item.
 *
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").ItemAttachmentsOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useAttachments refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/attachments").IAttachmentInfo[] | null | undefined} array of {@link IAttachmentInfo}.
 */
export function useAttachments(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/attachments").IAttachmentInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/attachments").IAttachmentInfo[] | null |undefined>>
   *  ]}
   **/
  const [attachments, setAttachments] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      assertID(itemId, "itemId value is not valid.");
      return resolveList(sp.web, list).items.getById(itemId).attachmentFiles;
    },
    [itemId, list],
  );

  const mergedDeps = mergeDependencies([itemId, list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, itemId, list);

    return opt;
  }, [itemId, list, options, globalOptions]);

  useQueryEffect(requestFactory, setAttachments, internalOpts, mergedDeps);

  return attachments;
}
