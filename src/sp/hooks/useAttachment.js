import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { assertID, assertString } from "../../utils/assert.js";
import { overrideAction } from "../createInvokable.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @typedef {import('@pnp/sp/attachments').IAttachmentInfo | ArrayBuffer | Blob | string} AttachmentReturnTypes **/

/**
 * @overload
 * Returns an attachment info from item.
 *
 * @param {string} attachmentName - Attachment file name. Changing the value resends request.
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").AttachmentInfoOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useAttachment refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/attachments").IAttachmentInfo | null | undefined} Attachment info object.
 */
/**
 * @overload
 * Returns attachment content as {@link Blob}.
 *
 * @param {string} attachmentName - Attachment file name. Changing the value resends request.
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").AttachmentBlobOptions} options - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useAttachment refreshes response data when one of the dependencies changes.
 * @returns {Blob | null | undefined} Attachment blob.
 */
/**
 * @overload
 * Returns attachment content as {@link ArrayBuffer}.
 *
 * @param {string} attachmentName - Attachment file name. Changing the value resends request.
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").AttachmentBufferOptions} options - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useAttachment refreshes response data when one of the dependencies changes.
 * @returns {ArrayBuffer | null | undefined} Attachment array buffer.
 */
/**
 * @overload
 * Returns attachment content as string.
 *
 * @param {string} attachmentName - Attachment file name. Changing the value resends request.
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").AttachmentTextOptions} options - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useAttachment refreshes response data when one of the dependencies changes.
 * @returns {string | null | undefined} Attachment content as text.
 */
/**
 * @param {string} attachmentName - Attachment file name. Changing the value resends request.
 * @param {number} itemId - List item numeric Id. Changing the value resends request.
 * @param {string} list - List title or GUID Id string. Changing the value resends request.
 * @param {import("./options.js").BaseAttachmentOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useAttachment refreshes response data when one of the dependencies changes.
 * @returns {AttachmentReturnTypes | null | undefined}
 */
export function useAttachment(attachmentName, itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    AttachmentReturnTypes | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<AttachmentReturnTypes | null |undefined>>
   *  ]}
   **/
  const [attachment, setAttachment] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      assertID(itemId, "itemId value is not valid.");
      assertString(attachmentName, "attachmentName value is not valid.");

      const queryInst = resolveList(sp.web, list)
        .items.getById(itemId)
        .attachmentFiles.getByName(attachmentName);

      switch (options?.type) {
        case "buffer":
          return overrideAction(queryInst, queryInst.getBuffer);
        case "blob":
          return overrideAction(queryInst, queryInst.getBlob);
        case "text":
          return overrideAction(queryInst, queryInst.getText);
        default:
          return queryInst;
      }
    },
    [itemId, list, attachmentName, options?.type],
  );

  const mergedDeps = mergeDependencies(
    [attachmentName, itemId, list, options?.type ?? "info"],
    deps,
  );

  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, attachmentName, itemId, list);

    return opt;
  }, [attachmentName, itemId, list, options, globalOptions]);

  useQueryEffect(requestFactory, setAttachment, internalOpts, mergedDeps);

  return attachment;
}
