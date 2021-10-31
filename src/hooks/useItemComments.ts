import "@pnp/sp/comments";
import "@pnp/sp/items";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertID } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
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