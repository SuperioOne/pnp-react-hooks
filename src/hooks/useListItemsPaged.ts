import "@pnp/sp/items";
import { IItems, PagedItemCollection } from "@pnp/sp/items/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, PagedODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, resolveList } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

const DEFAULT_PAGE_SIZE = 2000;

export interface ListItemsPagedOptions extends PnpHookOptions<PagedODataQueryable>
{
    /** 
     * Default page size is 2000.
     **/
    pageSize?: number;
}

type NextHandle = () => Promise<void>;

interface State<T>
{
    results: Array<T>;
    getNext?: NextHandle;

}

// TODO: create proper next functio.
export function useListItemsPaged<T>(
    list: string,
    options?: ListItemsPagedOptions,
    deps?: React.DependencyList): [Nullable<Array<T>>, Nullable<NextHandle>]
{
    const [pageState, setPageState] = useState<State<T>>({
        results: []
    });

    const stateAction = useCallback((pagedCollection: Nullable<PagedItemCollection<T[]>>) =>
    {
        if (pagedCollection && pagedCollection?.results?.length > 0)
        {
            const newResults = pageState.results.concat(pagedCollection.results);

        }
    }, [pageState]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        if (!list)
            throw new ParameterError("useListItemsPaged<T>: list value is not valid.", "list", list);

        const spList = resolveList(web, list);

        const action = async function (this: IItems)
        {
            return this.top(options?.pageSize ?? DEFAULT_PAGE_SIZE).getPaged<Array<T>>();
        };

        return createInvokable(spList.items, action);

    }, [list, options?.pageSize]);

    const _mergedDeps = deps
        ? [list, options?.pageSize].concat(deps)
        : [list, options?.pageSize];

    useQueryEffect(invokableFactory, stateAction, options, _mergedDeps);


    return [pageState.results, pageState.getNext];
}