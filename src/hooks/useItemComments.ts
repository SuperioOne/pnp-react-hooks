import "@pnp/sp/comments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertID } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemCommentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (itemId: number, list: string): boolean };
}

export function useItemComments(
    itemId: number,
    list: string,
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<ICommentInfo[]>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, itemId, list);

        return opt;
    }, [itemId, list, options, globalOptions]);

    useQueryEffect(invokableFactory, setComments, _options, _mergedDeps);

    return comments;
}