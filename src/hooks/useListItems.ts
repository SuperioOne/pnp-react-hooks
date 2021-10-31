import "@pnp/sp/items";
import { IItems } from "@pnp/sp/items/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection, FilteredODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions, ListOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

interface _ListItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    mode?: ListOptions;
}

export interface ListItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    mode?: ListOptions.Default;
}

export interface PagedItemsOptions extends PnpHookOptions<FilteredODataQueryable>
{
    mode: ListOptions.Auto | ListOptions.All;
}

export function useListItems<T>(
    list: string,
    options?: PagedItemsOptions,
    deps?: React.DependencyList): Nullable<T[]>;

export function useListItems<T>(
    list: string,
    options?: ListItemsOptions,
    deps?: React.DependencyList): Nullable<T[]>;

export function useListItems<T>(
    list: string,
    options?: _ListItemsOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const [items, setItems] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const spList = resolveList(web, list);

        switch (options?.mode)
        {
            case ListOptions.Auto:
                {
                    const listInfo = await spList.select("ItemCount")();

                    return listInfo.ItemCount > 100
                        ? createInvokable(spList.items, _getAll)
                        : createInvokable(spList.items);
                }
            case ListOptions.All:
                {
                    return createInvokable(spList.items, _getAll);
                }
            case ListOptions.Default:
            default:
                {
                    return createInvokable(spList.items);
                }
        }
    }, [list, options?.mode]);

    const _mergedDeps = mergeDependencies([list, options?.mode], deps);

    useQueryEffect(invokableFactory, setItems, options, _mergedDeps);

    return items;
}

async function _getAll(this: IItems)
{
    return this.getAll();
}