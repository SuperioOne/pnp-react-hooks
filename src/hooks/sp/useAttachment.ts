import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { FileReturnTypes } from "../../types/literalTypes";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { createInvokable } from "../../utils/createInvokable";
import { defaultCheckDisable, checkDisable } from "../../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";


interface _BaseAttachmentOptions extends PnpHookOptions<ODataQueryable>
{
    /**
     * Return type
     */
    type?: FileReturnTypes;
    disabled?: DisableOptionValueType | { (attachmentName: string, itemId: number, list: string): boolean };
}

export interface AttachmentInfoOptions extends _BaseAttachmentOptions
{
    type?: "info" | undefined;
}

export interface AttachmentTextOptions extends Omit<_BaseAttachmentOptions, "query">
{
    type: "text";
}

export interface AttachmentBufferOptions extends Omit<_BaseAttachmentOptions, "query">
{
    type: "buffer";
}

export interface AttachmentBlobOptions extends Omit<_BaseAttachmentOptions, "query">
{
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
    deps?: React.DependencyList): Nullable<IAttachmentInfo>;

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
    deps?: React.DependencyList): Nullable<Blob>;

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
    deps?: React.DependencyList): Nullable<ArrayBuffer>;

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
    deps?: React.DependencyList): Nullable<string>;

export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: _BaseAttachmentOptions,
    deps?: React.DependencyList): Nullable<InstanceTypes>
{
    const globalOptions = useContext(InternalContext);
    const [attachment, setAttachment] = useState<Nullable<InstanceTypes>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assertID(itemId, "itemId value is not valid.");
        assertString(attachmentName, "attachmentName value is not valid.");

        const queryInst = resolveList(sp.web, list)
            .items
            .getById(itemId)
            .attachmentFiles
            .getByName(attachmentName);

        switch (options?.type)
        {
            case "buffer": return createInvokable(queryInst, queryInst.getBuffer);
            case "blob": return createInvokable(queryInst, queryInst.getBlob);
            case "text": return createInvokable(queryInst, queryInst.getText);
            default: return createInvokable(queryInst);
        }
    }, [itemId, list, attachmentName, options?.type]);

    const _mergedDeps = mergeDependencies(
        [attachmentName, itemId, list, options?.type],
        deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, attachmentName, itemId, list);

        return opt;

    }, [attachmentName, itemId, list, options, globalOptions]);

    useQueryEffect(invokableFactory, setAttachment, _options, _mergedDeps);

    return attachment;
}