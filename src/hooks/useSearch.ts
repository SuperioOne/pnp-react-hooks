import "@pnp/sp/search";
import { CacheOptions, ExceptionOptions, LoadActionMode, Nullable, RenderOptions } from "../types";
import { CompletionObserver, from, Subscription } from "rxjs";
import { ISearchQuery, ISearchResponse, ISearchResult } from "@pnp/sp/search/types";
import { InternalContext } from "../context";
import { SearchResults } from "@pnp/sp/search";
import { compareTuples, errorHandler, shallowEqual } from "../utils";
import { sp } from "@pnp/sp";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";

const INITIAL_PAGE_INDEX = 1;
const INITIAL_STATE: SearchState = { currentPage: INITIAL_PAGE_INDEX };

export interface SearchOptions extends RenderOptions, CacheOptions, ExceptionOptions
{
    useCache?: boolean;
}

export type GetPageDispatch = (pageNo: number) => void;

export function useSearch(
    searchOptions: ISearchQuery | string,
    options?: SearchOptions,
    deps?: React.DependencyList): [Nullable<SpSearchResult>, GetPageDispatch]
{
    const [searchState, dispatch] = useReducer(_reducer, INITIAL_STATE);

    const globalOptions = useContext(InternalContext);

    const _subscription = useRef<Nullable<Subscription>>(undefined);
    const _searchOptions = useRef<Nullable<ISearchQuery | string>>(null);
    const _prevPage = useRef<number>(INITIAL_PAGE_INDEX);
    const _prevDeps = useRef<Nullable<React.DependencyList>>(null);

    const _getPageDispatch: GetPageDispatch = useCallback((pageNo: number) => dispatch({
        type: ActionTypes.ChangePageNo,
        pageNo: pageNo
    }), []);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        const optionsChanged = !compareTuples(_prevDeps.current, deps)
            || !shallowEqual(_searchOptions.current, searchOptions);

        // page change is ignored, if options are changed 
        const pageChanged = !optionsChanged
            && _prevPage.current !== searchState.currentPage;

        if (optionsChanged || pageChanged)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            _cleanup();

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
            {
                dispatch({
                    type: ActionTypes.NewSearchResult,
                    userResult: undefined,
                    pnpResult: searchState.pnpResult
                });
            }

            const observer: CompletionObserver<SearchResults> = {
                complete: _cleanup,
                error: (err: Error) =>
                {
                    dispatch({ type: ActionTypes.Reset, resetValue: null });
                    errorHandler(err, mergedOptions);
                }
            };

            let resultPromise: Promise<SearchResults>;

            if (pageChanged)
            {
                if (!searchState.pnpResult)
                    throw new TypeError("useSearch: search result object is undefined.");

                observer.next = data => dispatch({
                    type: ActionTypes.NewSearchResult,
                    pnpResult: data,
                    userResult: _createSPSearchResult(data, searchState.currentPage),
                    pageNo: searchState.currentPage
                });

                resultPromise = searchState.pnpResult.getPage(searchState.currentPage);
            }
            else
            {
                observer.next = data => dispatch({
                    type: ActionTypes.NewSearchResult,
                    pnpResult: data,
                    userResult: _createSPSearchResult(data, INITIAL_PAGE_INDEX),
                    pageNo: INITIAL_PAGE_INDEX
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

    }, [searchState.currentPage, searchOptions, searchState.pnpResult, options, globalOptions, deps, _cleanup]);

    return [searchState.userResult, _getPageDispatch];
}

const _reducer = (state: SearchState, action: SearchAction): SearchState => 
{
    switch (action.type)
    {
        case ActionTypes.ChangePageNo:
            if (action.pageNo < INITIAL_PAGE_INDEX)
                return { ...state, currentPage: INITIAL_PAGE_INDEX };
            else
                return { ...state, currentPage: action.pageNo };
        case ActionTypes.Reset:
            return {
                currentPage: INITIAL_PAGE_INDEX,
                pnpResult: action.resetValue,
                userResult: action.resetValue
            };
        case ActionTypes.NewSearchResult:
            return {
                currentPage: action.pageNo ?? state.currentPage,
                pnpResult: action.pnpResult,
                userResult: action.userResult
            };
        default:
            throw new Error(`useSearch: Unexpected action type received.`);
    }
};

const _createSPSearchResult = (sResult: SearchResults, pageNo: number) =>
({
    ElapsedTime: sResult.ElapsedTime,
    PrimarySearchResults: sResult.PrimarySearchResults,
    RawSearchResults: sResult.RawSearchResults,
    RowCount: sResult.RowCount,
    TotalRows: sResult.TotalRows,
    TotalRowsIncludingDuplicates: sResult.TotalRowsIncludingDuplicates,
    CurrentPage: pageNo
});

// using number enums instead of literal strings
enum ActionTypes
{
    ChangePageResult = 0,
    ChangePageNo = 1,
    NewSearchResult = 2,
    Reset = 3
}

interface SearchState
{
    pnpResult?: SearchResults | null;
    currentPage: number;
    userResult?: SpSearchResult | null;
}

interface Action<T extends ActionTypes>
{
    type: T;
}

interface ResetAction extends Action<ActionTypes.Reset>
{
    resetValue?: null | undefined;
}

interface ChangePageNoAction extends Action<ActionTypes.ChangePageNo>
{
    pageNo: number;
}

interface NewResultsAction extends Action<ActionTypes.NewSearchResult>
{
    pageNo?: number;
    pnpResult: SearchResults | null | undefined;
    userResult: SpSearchResult | null | undefined;
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
    CurrentPage: number;
}