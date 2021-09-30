import "@pnp/sp/comments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, mergeDependencies, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useItemComments(
    itemId: number,
    list: string,
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<Array<ICommentInfo>>
{
    const [comments, setComments] = useState<Nullable<Array<ICommentInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useItemComments: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useItemComments: list value is not valid.", "list", list);

        const queryInst = resolveList(web, list)
            .items
            .getById(itemId)
            .comments;

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = mergeDependencies([itemId, list], deps);

    useQueryEffect(invokableFactory, setComments, options, _mergedDeps);

    return comments;
}