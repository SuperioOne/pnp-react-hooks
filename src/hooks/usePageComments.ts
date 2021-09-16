import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { useQueryEffect } from "./internal/useQuery";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpActionFunction, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable } from "../utils";
import { useState, useCallback } from "react";

export type PageCommentsOptions = PnpHookOptions<ODataQueryableCollection>;

export function usePageComments(
    pageRelativePath: string,
    options?: PageCommentsOptions,
    deps?: React.DependencyList): Nullable<Array<ICommentInfo>>
{
    const [comments, setComments] = useState<Nullable<Array<ICommentInfo>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        // TODO: validate relative url
        const isRelativeUrl = true;

        if (!isRelativeUrl)
            throw new ParameterError("usePageComments: pageRelativePath value is not valid.", "pageRelativePath", pageRelativePath);

        const action: PnpActionFunction<IWeb, Array<ICommentInfo>> = async function ()
        {
            const page = await this.loadClientsidePage(pageRelativePath);
            return page.getComments();
        }

        return createInvokable(web, action);

    }, [pageRelativePath]);

    const mergedDeps = deps
        ? [pageRelativePath].concat(deps)
        : [pageRelativePath];

    useQueryEffect(invokableFactory, setComments, options, mergedDeps);

    return comments;
}
