import "@pnp/sp/attachments";
import { useQueryEffect } from "./internal/useQueryEffect";
import { FileReturnTypes, Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export interface AttachmentOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryableCollection>
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
    const [attachent, setAttachment] = useState<Nullable<InstanceTypes>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useAttachment: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useAttachment: list value is not valid.", "list", list);

        if (!attachmentName)
            throw new ParameterError("useAttachment: attachmentName value is not valid.", "attachmentName", attachmentName);

        const queryInstance = resolveList(web, list)
            .items
            .getById(itemId)
            .attachmentFiles
            .getByName(attachmentName);

        switch (options?.type)
        {
            case "buffer": return createInvokable(queryInstance, queryInstance.getBuffer);
            case "blob": return createInvokable(queryInstance, queryInstance.getBlob);
            case "text": return createInvokable(queryInstance, queryInstance.getText);
            default: return createInvokable(queryInstance);
        }

    }, [itemId, list, attachmentName, options?.type]);

    const mergedDeps = deps
        ? [attachmentName, itemId, list, options?.type].concat(deps)
        : [attachmentName, itemId, list, options?.type];

    useQueryEffect(invokableFactory, setAttachment, options, mergedDeps);

    return attachent;
}