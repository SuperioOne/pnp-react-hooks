import "@pnp/sp/comments";
import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { ICommentInfo } from "@pnp/sp/comments/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { assertID } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemCommentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (itemId: number, list: string): boolean };
}

/**
 * Returns comment collection of specific list item.
 * @param itemId Item Id. Changing the value resends request.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useItemComments will resend request when one of the dependencies changed.
 */
export function useItemComments(
    itemId: number,
    list: string,
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<ICommentInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [comments, setComments] = useState<Nullable<ICommentInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assertID(itemId, "itemId value is not valid.");

        const queryInst = resolveList(sp.web, list)
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