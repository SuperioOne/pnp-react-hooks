import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { InternalContext } from "../../context/internalContext.js";
import { assertID } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ItemAttachmentsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IAttachmentInfo} from "@pnp/sp/attachments" **/

/**
 * Returns all attachments of the item.
 *
 * @param {number} itemId - List item numeric Id. Value is automatically tracked for changes.
 * @param {string} list - List title or GUID Id string. Value is automatically tracked for changes.
 * @param {ItemAttachmentsOptions} [options] - Hook options
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IAttachmentInfo[] | null | undefined} array of IAttachmentInfo.
 */
export function useAttachments(itemId, list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IAttachmentInfo[] | null | undefined, Dispatch<SetStateAction<IAttachmentInfo[] | null |undefined>> ]} **/
  const [attachments, setAttachments] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
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
