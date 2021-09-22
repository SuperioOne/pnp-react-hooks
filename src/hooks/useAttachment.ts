import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { FileReturnTypes, Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export interface AttachmentOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    type?: T;
}

type InstanceTypes = IAttachmentInfo | ArrayBuffer | Blob | string;

export function useAttachment(attachmentName: string, itemId: number, list: string, options?: AttachmentOptions, deps?: React.DependencyList): Nullable<IAttachmentInfo>;
export function useAttachment(attachmentName: string, itemId: number, list: string, options?: AttachmentOptions<"blob">, deps?: React.DependencyList): Nullable<Blob>;
export function useAttachment(attachmentName: string, itemId: number, list: string, options?: AttachmentOptions<"buffer">, deps?: React.DependencyList): Nullable<ArrayBuffer>;
export function useAttachment(attachmentName: string, itemId: number, list: string, options?: AttachmentOptions<"text">, deps?: React.DependencyList): Nullable<string>;
export function useAttachment(attachmentName: string, itemId: number, list: string, options?: AttachmentOptions<FileReturnTypes>, deps?: React.DependencyList): Nullable<InstanceTypes>
{
    const [attachment, setAttachment] = useState<Nullable<InstanceTypes>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useAttachment: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useAttachment: list value is not valid.", "list", list);

        if (!attachmentName)
            throw new ParameterError("useAttachment: attachmentName value is not valid.", "attachmentName", attachmentName);

        const queryInst = resolveList(web, list)
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

    const _mergedDeps = deps
        ? [attachmentName, itemId, list, options?.type].concat(deps)
        : [attachmentName, itemId, list, options?.type];

    useQueryEffect(invokableFactory, setAttachment, options, _mergedDeps);

    return attachment;
}