import "@pnp/sp/items";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { FilteredODataQueryable } from "../types/ODataQueryable";
import { IItems, PagedItemCollection } from "@pnp/sp/items/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { errorHandler } from "../utils/errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";

const DEFAULT_PAGE_SIZE = 2000;

interface ListItemsPagedOptions extends PnpHookOptions<FilteredODataQueryable>
{
    /** 
     * Default page size is 2000.
     **/
    pageSize?: number;
    returnOnlyPageResult?: boolean;
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

export function useListItemsPaged<T>(
    list: string,
    options?: ListItemsPagedOptions,
    deps?: React.DependencyList): [Nullable<T[]>, NextPageDispatch, Nullable<boolean>]
{
    const globalOptions = useContext(InternalContext);
    const [pageState, setPageState] = useState<State<T>>();
    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    const _insertNewPage = useCallback((pageResult: Nullable<PagedItemCollection<T[]>>) =>
    {
        const newState: State<T> = {};

        if (pageResult)
        {
            newState.results = options?.returnOnlyPageResult
                ? pageResult.results
                : (pageState?.results ?? Array.prototype).concat(pageResult.results);

            newState.hasNext = pageResult.hasNext;
            newState.pagedResult = pageResult;
        }
        else
        {
            newState.results = pageResult;
        }

        setPageState(newState);
    }, [pageState?.results, options?.returnOnlyPageResult]);

    const getNext: NextPageDispatch = useCallback((callback) =>
    {
        if (pageState?.pagedResult && options?.disabled !== true)
        {
            _cleanup();

            const exceptionOpt = options?.exception
                ? options
                : globalOptions;

            const observer: NextObserver<PagedItemCollection<T[]>> = {
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

            _subscription.current = from(pageState.pagedResult.getNext())
                .subscribe(observer);
        }
    }, [pageState, options, globalOptions, _insertNewPage, _cleanup]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const queryInst = resolveList(web, list).items
            .top(options?.pageSize ?? DEFAULT_PAGE_SIZE);

        const action = function (this: IItems)
        {
            // cancels and clears getNext call when new parameters applied
            _cleanup();
            return this.getPaged<T[]>();
        };

        return createInvokable(queryInst, action);
    }, [options?.pageSize, list, _cleanup]);

    const _mergedDeps = mergeDependencies(
        [options?.pageSize, options?.returnOnlyPageResult, list],
        deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

        return opt;
    }, [list, options, globalOptions]);

    useQueryEffect(invokableFactory, _insertNewPage, _options, _mergedDeps);

    return [pageState?.results, getNext, pageState?.hasNext];
}

type NextPageDispatch = (callback?: () => void) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface State<T = any>
{
    results?: Nullable<T[]>;
    pagedResult?: PagedItemCollection<T[]>;
    hasNext?: boolean;
}
