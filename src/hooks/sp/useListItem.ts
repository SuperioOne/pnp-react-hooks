import "@pnp/sp/items";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { assertID } from "../../utils/assert";
import { createInvokable } from "../../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

export interface ListItemOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (itemId: number, list: string): boolean };
}

/**
 * Returns an item from specified list item collection.
 * @param itemId Item Id. Changing the value resends request.
 * @param list List GUID id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useListItem will resend request when one of the dependencies changed.
 */
export function useListItem<T>(
    itemId: number,
    list: string,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [itemData, setItemData] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assertID(itemId, "itemId value is not valid.");

        const queryInst = resolveList(sp.web, list)
            .items
            .getById(itemId);

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = mergeDependencies([itemId, list], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, itemId, list);

        return opt;
    }, [itemId, list, options, globalOptions]);

    useQueryEffect(invokableFactory, setItemData, _options, _mergedDeps);

    return itemData;
}