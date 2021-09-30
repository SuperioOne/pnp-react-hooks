import "@pnp/sp/items";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, FilteredODataQueryable, PnpHookOptions } from "../types";
import { IItems, PagedItemCollection } from "@pnp/sp/items/types";
import { resolveList, createInvokable, errorHandler } from "../utils";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";
import { from, NextObserver, Subscription } from "rxjs";
import { InternalContext } from "../context";

const DEFAULT_PAGE_SIZE = 2000;

interface ListItemsPagedOptions extends PnpHookOptions<FilteredODataQueryable>
{
    /** 
     * Default page size is 2000.
     **/
    pageSize?: number;
    returnOnlyPageResult?: boolean;
}

export function useListItemsPaged<T>(
    list: string,
    options?: ListItemsPagedOptions,
    deps?: React.DependencyList): [Nullable<Array<T>>, NextPageDispatch, Nullable<boolean>]
{
    const globalOptions = useContext(InternalContext);

    const [pageState, setPageState] = useState<State<T>>();

    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(_cleanup, [_cleanup]);

    const _insertNewPage = useCallback((pageResult: Nullable<PagedItemCollection<Array<T>>>) =>
    {
        const newState: State<T> = {};

        if (pageResult)
        {
            newState.results = options?.returnOnlyPageResult
                ? pageResult.results
                : (pageState?.results ?? Array.prototype).concat(pageResult.results);

            newState.hasNext = pageResult.hasNext;
            
            newState.getNext = pageResult.hasNext
                ? pageResult.getNext
                : undefined;
        }
        else
        {
            newState.results = pageResult;
        }

        setPageState(newState);

    }, [pageState?.results, options?.returnOnlyPageResult]);

    const getNext: NextPageDispatch = useCallback((callback) =>
    {
        setTimeout(async () =>
        {
            if (pageState?.getNext)
            {
                _cleanup();

                const exceptionOpt = options?.exception
                    ? options
                    : globalOptions;

                const observer: NextObserver<PagedItemCollection<Array<T>>> = {
                    next: _insertNewPage,
                    complete: () =>
                    {
                        _cleanup();
                        callback?.();
                    },
                    error: (err: Error) =>
                    {
                        _insertNewPage(null);
                        errorHandler(err, exceptionOpt);
                    }
                };

                _subscription.current = from(pageState.getNext())
                    .subscribe(observer);
            }
        }, 0);

    }, [pageState, options, globalOptions, _insertNewPage, _cleanup]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const queryInst = resolveList(web, list).items
            .top(options?.pageSize ?? DEFAULT_PAGE_SIZE);

        const action = function (this: IItems)
        {
            // cancels and clears getNext call when new parameters applied
            _cleanup();
            return this.getPaged<Array<T>>();
        };

        return createInvokable(queryInst, action);
    }, [options?.pageSize, list, _cleanup]);

    const _mergedDeps = deps
        ? [options?.returnOnlyPageResult, list].concat(deps)
        : [options?.returnOnlyPageResult, list];

    useQueryEffect(invokableFactory, _insertNewPage, options, _mergedDeps);

    return [pageState?.results, getNext, pageState?.hasNext];
}

type NextPageDispatch = (callback?: () => void) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface State<T = any>
{
    results?: Nullable<Array<T>>;
    getNext?: () => Promise<PagedItemCollection<T[]>>;
    hasNext?: boolean;
}
