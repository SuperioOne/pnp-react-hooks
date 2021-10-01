import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { FileReturnTypes, Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { assert, createInvokable, mergeDependencies, resolveList } from "../utils";
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

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(!isNaN(itemId), "itemId value is not valid.");
        assert(typeof attachmentName === "string", "attachmentName value is not valid.");

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

    const _mergedDeps = mergeDependencies(
        [attachmentName, itemId, list, options?.type],
        deps);

    useQueryEffect(invokableFactory, setAttachment, options, _mergedDeps);

    return attachment;
}