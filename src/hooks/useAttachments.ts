import "@pnp/sp/attachments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemAttachmentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useAttachments(
    itemId: number,
    list: string,
    options?: ItemAttachmentsOptions,
    deps?: React.DependencyList): Nullable<Array<IAttachmentInfo>>
{
    const [attachments, setAttachments] = useState<Nullable<Array<IAttachmentInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useAttachment: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useAttachment: list value is not valid.", "list", list);

        const queryInst = resolveList(web, list)
            .items
            .getById(itemId)
            .attachmentFiles;

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = deps
        ? [itemId, list].concat(deps)
        : [itemId, list];

    useQueryEffect(invokableFactory, setAttachments, options, _mergedDeps);

    return attachments;
}