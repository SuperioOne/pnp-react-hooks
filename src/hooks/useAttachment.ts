import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { FileReturnTypes } from "../types/literalTypes";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { defaultCheckDisable, checkDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * @inheritDoc
 */
export interface AttachmentOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    /**
     * Return type
     */
    type?: T;
    disabled?: DisableOptionValueType | { (attachmentName: string, itemId: number, list: string): boolean };
}

type InstanceTypes = IAttachmentInfo | ArrayBuffer | Blob | string;

/**
 * Returns attachment info of the item.
 * @param attachmentName Attachment file name. Changing this value resends request.
 * @param itemId List item numeric Id. Changing this value resends request.
 * @param list List title or GUID Id string. Changing this value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment will resend request when one of the dependencies changed.
 * @returns Attachment info object.
 */
export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: AttachmentOptions,
    deps?: React.DependencyList): Nullable<IAttachmentInfo>;

/**
 * Returns attachment content as {@link Blob}.
 * @param attachmentName Attachment file name. Changing this value resends request.
 * @param itemId List item numeric Id. Changing this value resends request.
 * @param list List title or GUID Id string. Changing this value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment will resend request when one of the dependencies changed.
 * @returns Attachment file content.
 */
export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: AttachmentOptions<"blob">,
    deps?: React.DependencyList): Nullable<Blob>;

/**
 * Returns attachment content as {@link ArrayBuffer}.
 * @param attachmentName Attachment file name. Changing this value resends request.
 * @param itemId List item numeric Id. Changing this value resends request.
 * @param list List title or GUID Id string. Changing this value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment will resend request when one of the dependencies changed.
 * @returns Attachment file content.
 */
export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: AttachmentOptions<"buffer">,
    deps?: React.DependencyList): Nullable<ArrayBuffer>;

/**
 * Returns attachment content as string.
 * @param attachmentName Attachment file name. Changing this value resends request.
 * @param itemId List item numeric Id. Changing this value resends request.
 * @param list List title or GUID Id string. Changing this value resends request.
 * @param options Pnp hook options.
 * @param deps useAttachment will resend request when one of the dependencies changed.
 * @returns Attachment file content.
 */
export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: AttachmentOptions<"text">,
    deps?: React.DependencyList): Nullable<string>;

export function useAttachment(
    attachmentName: string,
    itemId: number,
    list: string,
    options?: AttachmentOptions<FileReturnTypes>,
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