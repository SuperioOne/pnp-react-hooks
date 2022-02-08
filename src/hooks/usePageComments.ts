import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments";
import "@pnp/sp/comments/clientside-page";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IClientsidePage } from "@pnp/sp/clientside-pages/types";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assert } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { isUrl, UrlType } from "../utils/isUrl";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface PageCommentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (pageRelativePath: string): boolean };
}

export function usePageComments(
    pageRelativePath: string,
    options?: PageCommentsOptions,
    deps?: React.DependencyList): Nullable<ICommentInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [comments, setComments] = useState<Nullable<ICommentInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assert(isUrl(pageRelativePath, UrlType.Relative),
            "pageRelativePath value is not valid.");

        const page = await web.loadClientsidePage(pageRelativePath);

        const action = function (this: IClientsidePage)
        {
            return this.getComments();
        };

        return createInvokable(page, action);

    }, [pageRelativePath]);

    const _mergedDeps = mergeDependencies([pageRelativePath], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, pageRelativePath);

        return opt;
    }, [pageRelativePath, options, globalOptions]);

    useQueryEffect(invokableFactory, setComments, _options, _mergedDeps);

    return comments;
}
