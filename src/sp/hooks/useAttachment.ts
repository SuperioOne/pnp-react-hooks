import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { InternalContext } from "../../context";
import { ODataQueryable, FileReturnTypes } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { createInvokable } from "../createInvokable";
import { defaultCheckDisable, checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

interface _BaseAttachmentOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * Return type
   */
  type?: FileReturnTypes;
  disabled?:
    | DisableOptionValueType
    | { (attachmentName: string, itemId: number, list: string): boolean };
}

export interface AttachmentInfoOptions extends _BaseAttachmentOptions {
  type?: "info" | undefined;
}

export interface AttachmentTextOptions
  extends Omit<_BaseAttachmentOptions, "query"> {
  type: "text";
}

export interface AttachmentBufferOptions
  extends Omit<_BaseAttachmentOptions, "query"> {
  type: "buffer";
}

export interface AttachmentBlobOptions
  extends Omit<_BaseAttachmentOptions, "query"> {
  type: "blob";
}

type InstanceTypes = IAttachmentInfo | ArrayBuffer | Blob | string;

/**
 * Returns an attachment from item.
 * @param attachmentName Attachment file name. Changing the value resends request.
 * @param itemId List item numeric Id. Changing the value resends request.
 * @param list List title or GUID Id string. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment refreshes response data when one of the dependencies changes.
 * @returns Attachment info object.
 */
export function useAttachment(
  attachmentName: string,
  itemId: number,
  list: string,
  options?: AttachmentInfoOptions,
  deps?: React.DependencyList,
): IAttachmentInfo | null | undefined;

/**
 * Returns attachment content as {@link Blob}.
 * @param attachmentName Attachment file name. Changing the value resends request.
 * @param itemId List item numeric Id. Changing the value resends request.
 * @param list List title or GUID Id string. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment refreshes response data when one of the dependencies changes.
 * @returns Attachment file content.
 */
export function useAttachment(
  attachmentName: string,
  itemId: number,
  list: string,
  options?: AttachmentBlobOptions,
  deps?: React.DependencyList,
): Blob | null | undefined;

/**
 * Returns attachment content as {@link ArrayBuffer}.
 * @param attachmentName Attachment file name. Changing the value resends request.
 * @param itemId List item numeric Id. Changing the value resends request.
 * @param list List title or GUID Id string. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment refreshes response data when one of the dependencies changes.
 * @returns Attachment file content.
 */
export function useAttachment(
  attachmentName: string,
  itemId: number,
  list: string,
  options?: AttachmentBufferOptions,
  deps?: React.DependencyList,
): ArrayBuffer | null | undefined;

/**
 * Returns attachment content as string.
 * @param attachmentName Attachment file name. Changing the value resends request.
 * @param itemId List item numeric Id. Changing the value resends request.
 * @param list List title or GUID Id string. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment refreshes response data when one of the dependencies changes.
 * @returns Attachment file content.
 */
export function useAttachment(
  attachmentName: string,
  itemId: number,
  list: string,
  options?: AttachmentTextOptions,
  deps?: React.DependencyList,
): string | null | undefined;

export function useAttachment(
  attachmentName: string,
  itemId: number,
  list: string,
  options?: _BaseAttachmentOptions,
  deps?: React.DependencyList,
): InstanceTypes | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [attachment, setAttachment] = useState<
    InstanceTypes | null | undefined
  >();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertID(itemId, "itemId value is not valid.");
      assertString(attachmentName, "attachmentName value is not valid.");

      const queryInst = resolveList(sp.web, list)
        .items.getById(itemId)
        .attachmentFiles.getByName(attachmentName);

      switch (options?.type) {
        case "buffer":
          return createInvokable(queryInst, queryInst.getBuffer);
        case "blob":
          return createInvokable(queryInst, queryInst.getBlob);
        case "text":
          return createInvokable(queryInst, queryInst.getText);
        default:
          return createInvokable(queryInst);
      }
    },
    [itemId, list, attachmentName, options?.type],
  );

  const _mergedDeps = mergeDependencies(
    [attachmentName, itemId, list, options?.type],
    deps,
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      attachmentName,
      itemId,
      list,
    );

    return opt;
  }, [attachmentName, itemId, list, options, globalOptions]);

  useQueryEffect(invokableFactory, setAttachment, _options, _mergedDeps);

  return attachment;
}
