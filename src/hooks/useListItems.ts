import "@pnp/sp/items";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { ListOptions, Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useState, useCallback } from "react";
import { IList } from "@pnp/sp/lists";
import { IItems } from "@pnp/sp/items";

export interface ListItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    mode?: ListOptions;
}

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

        switch (options?.mode)
        {
            case ListOptions.Auto:
                return createInvokable(spList, getAuto);
            case ListOptions.LoadAll:
                return createInvokable(spList, getAll);
            case ListOptions.Default:
            default:
                return createInvokable(spList.items);
        }

    }, [list, options?.mode]);

    const _mergedDeps = deps
        ? [list, options?.mode].concat(deps)
        : [list, options?.mode];

    useQueryEffect(invokableFactory, setItems, options, _mergedDeps);

    return items;
}

function getAll<T>(this: IList)
{
    return _getAllItems<T>(this.items);
}

async function getAuto(this: IList)
{
    const list = await this.select("ItemCount")();

    return list.ItemCount > 5000
        ? _getAllItems(this.items)
        : this.items.get;
}

async function _getAllItems<T>(items: IItems)
{
    const response: Array<Array<T>> = [];

    let batch = await items.getPaged();

    response.push(batch.results as Array<T>);

    while (batch.hasNext)
    {
        batch = await batch.getNext();
        response.push(batch.results as Array<T>);
    }

    return Array.prototype.concat(...response) as Array<T>;
}