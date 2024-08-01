import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { InternalContext } from "../../context/internalContext.js";
import { assertID, assertString } from "../../utils/assert.js";
import { overrideAction } from "../overrideAction.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {BaseAttachmentOptions, AttachmentBlobOptions, AttachmentInfoOptions, AttachmentTextOptions, AttachmentBufferOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IAttachmentInfo} from "@pnp/sp/attachments" **/

/** @typedef {IAttachmentInfo | ArrayBuffer | Blob | string} AttachmentReturnTypes **/

/**
 * @overload
 * Returns an attachment info from item.
 *
 * @param {string} attachmentName - Attachment file name. Value is automatically tracked for changes.
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {AttachmentInfoOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IAttachmentInfo | null | undefined} Attachment info object.
 */
/**
 * @overload
 * Returns attachment content as `Blob`.
 *
 * @param {string} attachmentName - Attachment file name. Value is automatically tracked for changes.
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {AttachmentBlobOptions} options - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {Blob | null | undefined} Attachment blob.
 */
/**
 * @overload
 * Returns attachment content as `ArrayBuffer`.
 *
 * @param {string} attachmentName - Attachment file name. Value is automatically tracked for changes.
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {AttachmentBufferOptions} options - Pnp hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ArrayBuffer | null | undefined} Attachment array buffer.
 */
/**
 * @overload
 * Returns attachment content as string.
 *
 * @param {string} attachmentName - Attachment file name. Value is automatically tracked for changes.
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {AttachmentTextOptions} options - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {string | null | undefined} Attachment content as text.
 */
/**
 * @param {string} attachmentName - Attachment file name. Value is automatically tracked for changes.
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {BaseAttachmentOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {AttachmentReturnTypes | null | undefined}
 */
export function useAttachment(attachmentName, itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ AttachmentReturnTypes | null | undefined, Dispatch<SetStateAction<AttachmentReturnTypes | null |undefined>> ]} **/
  const [attachment, setAttachment] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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
