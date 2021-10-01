import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { IClientsidePage } from "@pnp/sp/clientside-pages/types";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { assert, createInvokable, isUrl, mergeDependencies, UrlType } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type PageCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function usePageComments(
    pageRelativePath: string,
    options?: PageCommentsOptions,
    deps?: React.DependencyList): Nullable<ICommentInfo[]>
{
    const [comments, setComments] = useState<Nullable<ICommentInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(isUrl(pageRelativePath, UrlType.Relative),
            "pageRelativePath value is not valid.");

        const page = await web.loadClientsidePage(pageRelativePath);

        const action = async function (this: IClientsidePage)
        {
            return this.getComments();
        };

        return createInvokable(page, action);

    }, [pageRelativePath]);

    const _mergedDeps = mergeDependencies([pageRelativePath], deps);

    useQueryEffect(invokableFactory, setComments, options, _mergedDeps);

    return comments;
}
