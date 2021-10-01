import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { assertID, createInvokable, mergeDependencies, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemAttachmentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useAttachments(
    itemId: number,
    list: string,
    options?: ItemAttachmentsOptions,
    deps?: React.DependencyList): Nullable<IAttachmentInfo[]>
{
    const [attachments, setAttachments] = useState<Nullable<IAttachmentInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assertID(itemId, "itemId value is not valid.");

        const queryInst = resolveList(web, list)
            .items
            .getById(itemId)
            .attachmentFiles;

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = mergeDependencies([itemId, list], deps);

    useQueryEffect(invokableFactory, setAttachments, options, _mergedDeps);

    return attachments;
}