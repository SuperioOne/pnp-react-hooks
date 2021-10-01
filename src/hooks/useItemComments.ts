import "@pnp/sp/comments";
import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { assertID, createInvokable, mergeDependencies, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useItemComments(
    itemId: number,
    list: string,
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<ICommentInfo[]>
{
    const [comments, setComments] = useState<Nullable<ICommentInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assertID(itemId, "itemId value is not valid.");

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