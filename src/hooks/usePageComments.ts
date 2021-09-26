import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { IClientsidePage } from "@pnp/sp/clientside-pages/types";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpActionFunction, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isUrl, UrlType } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type PageCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function usePageComments(
    pageRelativePath: string,
    options?: PageCommentsOptions,
    deps?: React.DependencyList): Nullable<Array<ICommentInfo>>
{
    const [comments, setComments] = useState<Nullable<Array<ICommentInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        if (!isUrl(pageRelativePath, UrlType.Relative))
            throw new ParameterError("usePageComments: pageRelativePath value is not valid.", "pageRelativePath", pageRelativePath);

        const page = await web.loadClientsidePage(pageRelativePath);

        const action: PnpActionFunction<IClientsidePage, Array<ICommentInfo>> = async function ()
        {
            return this.getComments();
        };

        return createInvokable(page, action);

    }, [pageRelativePath]);

    const _mergedDeps = deps
        ? [pageRelativePath].concat(deps)
        : [pageRelativePath];

    useQueryEffect(invokableFactory, setComments, options, _mergedDeps);

    return comments;
}
