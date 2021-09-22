import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";

export type ListItemsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useListItems<T>(
    list: string,
    options?: ListItemsOptions,
    deps?: React.DependencyList): Nullable<Array<T>>
{
    const [items, setItems] = useState<Nullable<Array<T>>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (!list)
            throw new ParameterError("useListItem<T>: list value is not valid.", "list", list);

        const spList = resolveList(web, list);

        return createInvokable(spList.items);

    }, [list]);

    const _mergedDeps = deps
        ? [list].concat(deps)
        : [list];

    useQueryEffect(invokableFactory, setItems, options, _mergedDeps);

    return items;
}