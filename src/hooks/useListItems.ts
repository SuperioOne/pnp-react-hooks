import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IItems } from "@pnp/sp/items/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection, FilteredODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions, ListOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

interface _ListItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    mode?: ListOptions;
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface ListItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    mode?: ListOptions.Default;
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface PagedItemsOptions extends PnpHookOptions<FilteredODataQueryable>
{
    mode: ListOptions.All;
    disabled?: DisableOptionValueType | { (list: string): boolean };
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
    const globalOptions = useContext(InternalContext);
    const [items, setItems] = useState<Nullable<T[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const spList = resolveList(web, list);

        switch (options?.mode)
        {
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

        return opt;
    }, [list, options, globalOptions]);

    useQueryEffect(invokableFactory, setItems, _options, _mergedDeps);

    return items;
}

async function _getAll(this: IItems)
{
    return this.getAll();
}