import "@pnp/sp/attachments";
import useQueryEffect from "./internal/useQuery";
import { IAttachmentInfo } from "@pnp/sp/attachments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemAttachmentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useItemAttachments(
    itemId: number,
    list: string,
    options?: ItemAttachmentsOptions,
    deps?: React.DependencyList): Nullable<Array<IAttachmentInfo>>
{
    const [attachments, setAttachments] = useState<Nullable<Array<IAttachmentInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useItemAttachments: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useItemAttachments: list value is not valid.", "list", list);

        const queryInstance = resolveList(web, list)
            .items
            .getById(itemId)
            .attachmentFiles;

        return createInvokable(queryInstance, queryInstance.defaultAction);

    }, [itemId, list]);

    const mergedDeps = deps
        ? [itemId, list, ...deps]
        : [itemId, list];

    useQueryEffect(invokableFactory, setAttachments, options, mergedDeps);

    return attachments;
}