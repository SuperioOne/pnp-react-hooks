import "@pnp/sp/search";
import { CompletionObserver, from, Subscription } from "rxjs";
import { DisableOptionType, DisableOptionValueType } from "../../types/options/RenderOptions";
import { ISearchQuery, ISearchResponse, ISearchResult } from "@pnp/sp/search/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { RenderOptions, CacheOptions, ExceptionOptions, LoadActionMode } from "../../types/options";
import { SearchResults } from "@pnp/sp/search";
import { assert } from "../../utils/assert";
import { compareTuples } from "../../utils/compareTuples";
import { defaultCheckDisable, checkDisable } from "../../utils/checkDisable";
import { errorHandler } from "../../utils/errorHandler";
import { mergeOptions } from "../../utils/merge";
import { shallowEqual } from "../../utils/shallowEqual";
import { spfi as sp } from "@pnp/sp";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";

const INITIAL_PAGE_INDEX = 1;
const INITIAL_STATE: SearchState = { currentPage: INITIAL_PAGE_INDEX };

export interface SearchOptions extends RenderOptions, CacheOptions, ExceptionOptions
{
    useCache?: boolean;
    disabled?: DisableOptionValueType | { (searchOptions: ISearchQuery | string): boolean };
}

export type GetPageDispatch = (pageNo: number, callback?: () => void) => void;

export function useSearch(
    searchOptions: ISearchQuery | string,
    options?: SearchOptions,
    deps?: React.DependencyList): [Nullable<SpSearchResult>, GetPageDispatch]
{
    const globalOptions = useContext(InternalContext);
    const [searchState, dispatch] = useReducer(_reducer, INITIAL_STATE);
    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        page: INITIAL_PAGE_INDEX,
        searchOptions: null
    });
    const _subscription = useRef<Nullable<Subscription>>(undefined);
    const _disabled = useRef<DisableOptionType | undefined>(options?.disabled);

    const _getPageDispatch: GetPageDispatch = useCallback((pageNo: number, callback?: () => void) =>
    {
        if (_disabled.current !== true)
        {
            dispatch({
                type: ActionTypes.ChangePageNo,
                pageNo: pageNo,
                callback: callback
            });
        }
        else
        {
            console.warn("useSearch hook is disabled. Hook will not load requested page.");
        }
    }, []);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        const mergedOptions = mergeOptions(globalOptions, options);
        _disabled.current = checkDisable(mergedOptions?.disabled, defaultCheckDisable, searchOptions);

        if (_disabled.current !== true)
        {
            const searchOptChanged = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.searchOptions, searchOptions);

            // page change is ignored, if options are changed 
            const pageChanged = !searchOptChanged
                && _innerState.current.page !== searchState.currentPage;

            if (searchOptChanged || pageChanged)
            {

                try
                {
                    _cleanup();

                    if (mergedOptions.requestActionOption !== LoadActionMode.KeepPrevious)
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
                        assert(searchState.pnpResult, "search result object is undefined.");

                        observer.next = data =>
                        {
                            searchState.callback?.();
                            dispatch({
                                type: ActionTypes.NewSearchResult,
                                pnpResult: data,
                                userResult: _createSPSearchResult(data, searchState.currentPage),
                                pageNo: searchState.currentPage
                            });
                        };

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
                            ? sp().search(searchOptions)
                            : sp().search(searchOptions);
                    }

                    _subscription.current = from(resultPromise)
                        .subscribe(observer);
                }
                catch (err)
                {
                    errorHandler(err, mergedOptions);
                }
            }

            _innerState.current = {
                externalDependencies: deps,
                page: searchState.currentPage,
                searchOptions: searchOptions
            };
        }
    }, [searchState, searchOptions, options, globalOptions, deps, _cleanup]);

    return [searchState.userResult, _getPageDispatch];
}

const _reducer = (state: SearchState, action: SearchAction): SearchState => 
{
    switch (action.type)
    {
        case ActionTypes.ChangePageNo:
            if (action.pageNo < INITIAL_PAGE_INDEX)
                return { ...state, currentPage: INITIAL_PAGE_INDEX, callback: action.callback };
            else
                return { ...state, currentPage: action.pageNo, callback: action.callback };
        case ActionTypes.Reset:
            return {
                currentPage: INITIAL_PAGE_INDEX,
                pnpResult: action.resetValue,
                userResult: action.resetValue,
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
    CurrentPage: pageNo,
    ElapsedTime: sResult.ElapsedTime,
    PrimarySearchResults: sResult.PrimarySearchResults,
    RawSearchResults: sResult.RawSearchResults,
    RowCount: sResult.RowCount,
    TotalRows: sResult.TotalRows,
    TotalRowsIncludingDuplicates: sResult.TotalRowsIncludingDuplicates
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
    callback?: () => void;
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
    callback?: () => void;
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
    CurrentPage: number;
    ElapsedTime: number;
    PrimarySearchResults: ISearchResult[];
    RawSearchResults: ISearchResponse;
    RowCount: number;
    TotalRows: number;
    TotalRowsIncludingDuplicates: number;
}

interface TrackedState
{
    searchOptions: Nullable<ISearchQuery | string>;
    externalDependencies: Nullable<React.DependencyList>
    page: number;
}