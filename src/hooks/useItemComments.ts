import "@pnp/sp/comments";
import { useQueryEffect } from "./internal/useQuery";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ItemCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useItemComments(
    itemId: number,
    list: string,
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<Array<ICommentInfo>>
{
    const [comments, setComments] = useState<Nullable<Array<ICommentInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (isNaN(itemId))
            throw new ParameterError("useItemComments: itemId value is not valid.", "itemId", itemId);

        if (!list)
            throw new ParameterError("useItemComments: list value is not valid.", "list", list);

        const queryInstance = resolveList(web, list)
            .items
            .getById(itemId)
            .comments;

        return createInvokable(queryInstance);

    }, [itemId, list]);

    const mergedDeps = deps
        ? [itemId, list].concat(deps)
        : [itemId, list];

    useQueryEffect(invokableFactory, setComments, options, mergedDeps);

    return comments;
}