import "@pnp/sp/items";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertID } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type ListItemOptions = PnpHookOptions<ODataQueryable>;

export function useListItem<T>(
    itemId: number,
    list: string,
    options?: ListItemOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [itemData, setItemData] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assertID(itemId, "itemId value is not valid.");

        const queryInst = resolveList(web, list)
            .items
            .getById(itemId);

        return createInvokable(queryInst);

    }, [itemId, list]);

    const _mergedDeps = mergeDependencies([itemId, list], deps);

    useQueryEffect(invokableFactory, setItemData, options, _mergedDeps);

    return itemData;
}
