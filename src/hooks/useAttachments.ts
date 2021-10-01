import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { assert, createInvokable, mergeDependencies, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemAttachmentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useAttachments(
    itemId: number,
    list: string,
    options?: ItemAttachmentsOptions,
    deps?: React.DependencyList): Nullable<Array<IAttachmentInfo>>
{
    const [attachments, setAttachments] = useState<Nullable<Array<IAttachmentInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(!isNaN(itemId), "itemId value is not valid.");

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