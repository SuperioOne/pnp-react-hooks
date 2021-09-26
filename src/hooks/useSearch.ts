import "@pnp/sp/search";
import { CacheOptions, ExceptionOptions, LoadActionMode, Nullable, RenderOptions } from "../types";
import { ISearchQuery, ISearchResponse, ISearchResult } from "@pnp/sp/search/types";
import { InternalContext } from "../context";
import { SearchResults } from "@pnp/sp/search";
import { compareTuples, errorHandler, shallowEqual } from "../utils";
import { CompletionObserver, from, Subscription } from "rxjs";
import { sp } from "@pnp/sp";
import { useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";

export interface SearchOptions extends RenderOptions, CacheOptions, ExceptionOptions
{
    useCache?: boolean;
}

export function useSearch(
    searchOptions: ISearchQuery | string,
    options?: SearchOptions,
    deps?: React.DependencyList): [Nullable<SpSearchResult>, (pageNo: number) => void]
{
    const [searchState, dispatch] = useReducer(reducer, INITIAL_STATE);

    const globalOptions = useContext(InternalContext);

    const _prevDeps = useRef<Nullable<React.DependencyList>>(null);
    const _prevPage = useRef<number>(INITIAL_STATE.currentPage);
    const _searchOptions = useRef<Nullable<ISearchQuery | string>>(null);
    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _pageChangeDispatcher = useCallback((pageNo: number) => dispatch({
        type: ActionTypes.ChangePageNo,
        pageNo: pageNo
    }), []);

    const _cleanUp = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(_cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        const optionsChanged = !compareTuples(_prevDeps.current, deps)
            || !shallowEqual(_searchOptions.current, searchOptions);

        // if options are changed page no change is ignored
        const pageChanged = !optionsChanged
            && _prevPage.current !== searchState.currentPage
            && searchState.searchResult;

        if (optionsChanged || pageChanged)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            _cleanUp();

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
            {
                dispatch({ type: ActionTypes.Reset });
            }

            const observer: CompletionObserver<SearchResults> = {
                complete: _cleanUp,
                error: (err: Error) =>
                {
                    dispatch({ type: ActionTypes.Reset, resetValue: null });
                    errorHandler(err, mergedOptions);
                }
            };

            let resultPromise: Promise<SearchResults>;

            if (pageChanged)
            {
                if (!searchState.searchResult)
                    throw new TypeError("useSearch: search result object is undefined.");

                observer.next = data => dispatch({
                    type: ActionTypes.NewSearchResult,
                    data: data,
                    pageNo: searchState.currentPage
                });

                resultPromise = searchState.searchResult.getPage(searchState.currentPage);
            }
            else
            {
                observer.next = data => dispatch({
                    type: ActionTypes.NewSearchResult,
                    data: data,
                    pageNo: 0
                });

                resultPromise = mergedOptions?.useCache === true
                    ? sp.searchWithCaching(searchOptions)
                    : sp.search(searchOptions);
            }

            _subscription.current = from(resultPromise)
                .subscribe(observer);
        }

        _prevPage.current = searchState.currentPage;
        _prevDeps.current = deps;
        _searchOptions.current = searchOptions;

    }, [searchState.currentPage, searchOptions, searchState.searchResult, options, globalOptions, deps, _cleanUp]);

    const userResult = useMemo((): SpSearchResult | undefined | null =>
    {
        // strip non-managed properties
        return searchState.searchResult ?
            {
                ElapsedTime: searchState.searchResult.ElapsedTime,
                PrimarySearchResults: searchState.searchResult.PrimarySearchResults,
                RawSearchResults: searchState.searchResult.RawSearchResults,
                RowCount: searchState.searchResult.RowCount,
                TotalRows: searchState.searchResult.TotalRows,
                TotalRowsIncludingDuplicates: searchState.searchResult.TotalRowsIncludingDuplicates,
            }
            : searchState.searchResult;
    }, [searchState.searchResult]);

    return [userResult, _pageChangeDispatcher];
}

function reducer(state: SearchState, action: SearchAction): SearchState
{
    switch (action.type)
    {
        case ActionTypes.ChangePageNo:
            return { ...state, currentPage: action.pageNo };
        case ActionTypes.Reset:
            return { currentPage: 0, searchResult: action.resetValue };
        case ActionTypes.NewSearchResult:
            return { currentPage: action.pageNo, searchResult: action.data };
        default:
            throw new Error(`useSearch: Unexpected action type received.`);
    }
}

const INITIAL_STATE: SearchState = { currentPage: 0 };

// using numbers instead of literal strings
enum ActionTypes
{
    ChangePageResult = 0,
    ChangePageNo = 1,
    NewSearchResult = 2,
    Reset = 3
}

interface SearchState
{
    searchResult?: SearchResults | null;
    currentPage: number;
}

interface Action<T extends ActionTypes>
{
    type: T;
}

interface ResetAction extends Action<ActionTypes.Reset>
{
    resetValue?: null | undefined | SearchResults;
}

interface ChangePageNoAction extends Action<ActionTypes.ChangePageNo>
{
    pageNo: number;
}

interface NewResultsAction extends Action<ActionTypes.NewSearchResult>
{
    data?: SearchResults;
    pageNo: number;
}

type SearchAction = ResetAction | ChangePageNoAction | NewResultsAction;

interface SpSearchResult
{
    ElapsedTime: number;
    RowCount: number;
    TotalRows: number;
    TotalRowsIncludingDuplicates: number;
    RawSearchResults: ISearchResponse;
    PrimarySearchResults: Array<ISearchResult>;
}