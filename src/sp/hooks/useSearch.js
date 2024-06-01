import "@pnp/sp/search";
import {
  DisableOptionType,
  DisableOptionValueType,
  RenderOptions,
  ErrorOptions,
  ContextOptions,
  BehaviourOptions,
} from "../../types";
import {
  ISearchQuery,
  ISearchResponse,
  ISearchResult,
  SearchQueryInit,
  ISearchBuilder,
} from "@pnp/sp/search/types";
import { InjectAbortSignal } from "../../behaviors/internals";
import { InternalContext } from "../../context";
import { _PnpHookOptions } from "../types";
import { SearchResults } from "@pnp/sp/search";
import { assert, assertNumber } from "../../utils/assert";
import { compareTuples, shallowEqual } from "../../utils/compare";
import { defaultCheckDisable, checkDisable } from "../checkDisable";
import { errorHandler } from "../errorHandler";
import { mergeOptions } from "../merge";
import { resolveSP } from "../resolveSP";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";

const DEFAULT_PAGE_SIZE = 10;
const INITIAL_PAGE_INDEX = 1;
const INITIAL_STATE: SearchState = { currentPage: INITIAL_PAGE_INDEX };

export function isSearchQueryBuilder(
  query: SearchQueryInit,
): query is ISearchBuilder {
  const builder = <ISearchBuilder>query;
  return typeof builder?.toSearchQuery === "function";
}

export interface SearchOptions
  extends RenderOptions,
    ErrorOptions,
    BehaviourOptions,
    ContextOptions {
  disabled?:
    | DisableOptionValueType
    | { (searchOptions: ISearchQuery | string): boolean };
}

export type GetPageDispatch = (pageNo: number, callback?: () => void) => void;

/**
 * Search
 * @param searchQuery {@link ISearchQuery} query or search text. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useSearch refreshes response data when one of the dependencies changes.
 */
export function useSearch(
  searchQuery: ISearchQuery | string,
  options?: SearchOptions,
  deps?: React.DependencyList,
): [SpSearchResult | null | undefined, GetPageDispatch] {
  const globalOptions = useContext(InternalContext);
  const [searchState, dispatch] = useReducer(_reducer, INITIAL_STATE);
  const _innerState = useRef<TrackedState>({
    externalDependencies: null,
    page: INITIAL_PAGE_INDEX,
    searchQuery: null,
    options: null,
  });
  const _abortController = useRef<AbortController | undefined>(
    new AbortController(),
  );
  const _disabled = useRef<DisableOptionType | undefined>(options?.disabled);

  const _getPageDispatch: GetPageDispatch = useCallback(
    (pageNo: number, callback?: () => void) => {
      if (_disabled.current !== true) {
        dispatch({
          type: ActionTypes.ChangePageNo,
          pageNo: pageNo,
          callback: callback,
        });
      } else {
        console.warn(
          "useSearch hook is disabled. Hook will not load requested page.",
        );
      }
    },
    [],
  );

  const _cleanup = useCallback(() => {
    _abortController.current?.abort();
    _abortController.current = undefined;
  }, []);

  useEffect(() => _cleanup, [_cleanup]);

  useEffect(() => {
    const mergedOptions = mergeOptions(globalOptions, options);
    _disabled.current = checkDisable(
      mergedOptions?.disabled,
      defaultCheckDisable,
      searchQuery,
    );

    if (_disabled.current !== true) {
      let pageNo = searchState.currentPage;

      const searchOptChanged =
        !compareTuples(_innerState.current.externalDependencies, deps) ||
        !shallowEqual(_innerState.current.searchQuery, searchQuery) ||
        !shallowEqual(_innerState.current.options?.sp, mergedOptions?.sp);

      // page change is ignored, if options are changed
      // both page numbers can be NaN, use Object.is for comparison
      const pageChanged =
        !searchOptChanged &&
        !Object.is(_innerState.current.page, searchState.currentPage);

      if (searchOptChanged || pageChanged) {
        try {
          _cleanup();
          _abortController.current = new AbortController();

          if (mergedOptions.keepPreviousState !== true) {
            dispatch({
              type: ActionTypes.NewSearchResult,
              pageNo: pageNo,
              pnpResult: searchState.pnpResult,
              userResult: undefined,
            });
          }

          const sp = resolveSP(mergedOptions, [
            InjectAbortSignal(_abortController.current),
          ]);
          let query = _parseQuery(searchQuery);
          let startRow: number = 0;
          let totalRows: number = 0;

          if (pageChanged) {
            assert(searchState.pnpResult, "search result object is undefined.");
            assertNumber(searchState.currentPage);

            pageNo = searchState.currentPage;
            startRow = (pageNo - 1) * (query.RowLimit ?? DEFAULT_PAGE_SIZE);
            totalRows = searchState.pnpResult.TotalRows;

            query = {
              ...query,
              StartRow: startRow,
            };
          } else {
            pageNo = INITIAL_PAGE_INDEX;
          }

          if (startRow > totalRows) {
            dispatch({
              type: ActionTypes.NewSearchResult,
              pageNo: pageNo,
              pnpResult: searchState.pnpResult,
              userResult: undefined,
            });
          } else {
            dispatch({
              type: ActionTypes.ChangePageNo,
              pageNo: pageNo,
            });

            setTimeout(async () => {
              try {
                const response = await sp.search(query);
                dispatch({
                  type: ActionTypes.NewSearchResult,
                  pnpResult: response,
                  userResult: _createSPSearchResult(response, pageNo),
                  pageNo: pageNo,
                });
              } catch (err) {
                if (err.name !== "AbortError") {
                  dispatch({ type: ActionTypes.Reset, resetValue: null });
                  errorHandler(err, mergedOptions);
                }
              }
            });
          }
        } catch (err) {
          errorHandler(err, mergedOptions);
        }
      }

      _innerState.current = {
        externalDependencies: deps,
        page: pageNo,
        searchQuery: searchQuery,
        options: mergedOptions,
      };
    }
  }, [searchState, searchQuery, options, globalOptions, deps, _cleanup]);

  return [searchState.userResult, _getPageDispatch];
}

const _reducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case ActionTypes.ChangePageNo:
      if (action.pageNo < INITIAL_PAGE_INDEX)
        return {
          ...state,
          currentPage: INITIAL_PAGE_INDEX,
          callback: action.callback,
        };
      else
        return {
          ...state,
          currentPage: action.pageNo,
          callback: action.callback,
        };
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
        userResult: action.userResult,
      };
    default:
      throw new Error(`useSearch: Unexpected action type received.`);
  }
};

const _createSPSearchResult = (sResult: SearchResults, pageNo: number) => ({
  CurrentPage: pageNo,
  ElapsedTime: sResult.ElapsedTime,
  PrimarySearchResults: sResult.PrimarySearchResults,
  RawSearchResults: sResult.RawSearchResults,
  RowCount: sResult.RowCount,
  TotalRows: sResult.TotalRows,
  TotalRowsIncludingDuplicates: sResult.TotalRowsIncludingDuplicates,
});

const _parseQuery = (query: SearchQueryInit): ISearchQuery => {
  if (typeof query === "string") {
    return { Querytext: query };
  } else if (isSearchQueryBuilder(query)) {
    return query.toSearchQuery();
  } else {
    return query;
  }
};

// using number enums instead of literal strings
enum ActionTypes {
  ChangePageResult = 0,
  ChangePageNo = 1,
  NewSearchResult = 2,
  Reset = 3,
}

interface SearchState {
  pnpResult?: SearchResults | null;
  currentPage: number;
  userResult?: SpSearchResult | null;
  callback?: () => void;
}

interface Action<T extends ActionTypes> {
  type: T;
}

interface ResetAction extends Action<ActionTypes.Reset> {
  resetValue?: null | undefined;
}

interface ChangePageNoAction extends Action<ActionTypes.ChangePageNo> {
  pageNo: number;
  callback?: () => void;
}

interface NewResultsAction extends Action<ActionTypes.NewSearchResult> {
  pageNo?: number;
  pnpResult: SearchResults | null | undefined;
  userResult: SpSearchResult | null | undefined;
}

type SearchAction = ResetAction | ChangePageNoAction | NewResultsAction;

export interface SpSearchResult {
  CurrentPage: number;
  ElapsedTime: number;
  PrimarySearchResults: ISearchResult[];
  RawSearchResults: ISearchResponse;
  RowCount: number;
  TotalRows: number;
  TotalRowsIncludingDuplicates: number;
}

interface TrackedState {
  searchQuery: ISearchQuery | string | null | undefined;
  externalDependencies: React.DependencyList | null | undefined;
  page: number;
  options: _PnpHookOptions<unknown> | null | undefined;
}
