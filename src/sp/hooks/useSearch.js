import "@pnp/sp/search";
import {
  AbortSignalSource,
  InjectAbortSignal,
} from "../../behaviors/internals";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { compareTuples } from "../../utils/compare";
import { deepCompareOptions } from "../deepCompare";
import { errorHandler } from "../errorHandler";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveSP } from "../resolveSP";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { assertMin } from "../../utils/assert";

const DEFAULT_PAGE_SIZE = 10;

/**
 * @typedef SpSearchResult
 * @property {number} currentPage
 * @property {number} elapsedTime
 * @property {import("@pnp/sp/search").ISearchResult[]} primarySearchResults
 * @property {import("@pnp/sp/search").ISearchResponse} rawSearchResults
 * @property {number} rowCount
 * @property {number} totalRows
 * @property {number} totalRowsIncludingDuplicates
 */

/**
 * @typedef {(pageNo:number, callback?:(result?: SpSearchResult | undefined, err?: any) => void) => void} GetPageDispatch
 */

/**
 * @param {import("@pnp/sp/search").SearchQueryInit} query
 * @returns {query is import("@pnp/sp/search").ISearchBuilder}
 */
function isSearchQueryBuilder(query) {
  if (typeof query === "string") {
    return false;
  } else {
    /** @type {import("@pnp/sp/search").ISearchBuilder}**/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const builder = query;
    return typeof builder?.toSearchQuery === "function";
  }
}

/**
 * @param {import('@pnp/sp/search').SearchResults} sResult
 * @param {number} pageNo
 * @returns {SpSearchResult}
 */
function createSPSearchResult(sResult, pageNo) {
  return {
    currentPage: pageNo,
    elapsedTime: sResult.ElapsedTime,
    primarySearchResults: sResult.PrimarySearchResults,
    rawSearchResults: sResult.RawSearchResults,
    rowCount: sResult.RowCount,
    totalRows: sResult.TotalRows,
    totalRowsIncludingDuplicates: sResult.TotalRowsIncludingDuplicates,
  };
}

/**
 * @param {import("@pnp/sp/search").SearchQueryInit} query
 * @returns {import("@pnp/sp/search").ISearchQuery}
 */
function parseQuery(query) {
  if (typeof query === "string") {
    return { Querytext: query, StartRow: 0, RowLimit: DEFAULT_PAGE_SIZE };
  } else if (isSearchQueryBuilder(query)) {
    return query.toSearchQuery();
  } else {
    return query;
  }
}

/**
 * @param {string | import("@pnp/sp/search").ISearchQuery} query
 * @returns {string}
 */
function searchQueryKey(query) {
  return typeof query === "string" ? query : "__SEARCH_QUERY_OBJ__";
}

/**
 * Search
 *
 * @param {string | import("@pnp/sp/search").ISearchQuery} searchQuery - ISearchQuery query or search text. Changing the value resends request.
 * @param {import("./options").SearchOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSearch refreshes response data when one of the dependencies changes.
 * @returns {[SpSearchResult | null | undefined, GetPageDispatch]}
 */
export function useSearch(searchQuery, options, deps) {
  /**
   * @typedef _HookState
   *
   * @property {import("../types.private").InternalPnpHookOptions | null | undefined} options
   * @property {import("react").DependencyList | null | undefined} externalDeps
   * @property {import("@pnp/sp/search").ISearchQuery | undefined | null} searchQuery
   * @property {boolean} disabled
   * @property {number} activePageNo
   */

  const abortSource = useRef(new AbortSignalSource());
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/search").SearchResults | null | undefined,
   *    import("react").Dispatch<import("@pnp/sp/search").SearchResults | null | undefined>
   *  ]}
   */
  const [searchResult, setSearchResult] = useState();
  const innerState = useRef(
    /** @type{_HookState} **/ ({
      externalDeps: null,
      searchQuery: null,
      options: null,
      disabled: true,
      activePageNo: 0,
    }),
  );

  const getPageDispatch = useCallback(
    /** @type{GetPageDispatch} **/
    (pageNo, callback) => {
      if (
        !innerState.current.disabled &&
        !!innerState.current.searchQuery &&
        !!innerState.current.options
      ) {
        assertMin(pageNo, 1, "Page no cannot be less than 1.");

        abortSource.current.abort();
        abortSource.current.reset();
        innerState.current.activePageNo = pageNo;

        if (innerState.current.options?.keepPreviousState !== true) {
          setSearchResult(undefined);
        }

        const sp = resolveSP(innerState.current.options, [
          InjectAbortSignal(abortSource.current),
        ]);
        const signalRef = abortSource.current.signal;
        const pageQuery = structuredClone(innerState.current.searchQuery);

        pageQuery.RowLimit = pageQuery.RowLimit
          ? pageQuery.RowLimit
          : DEFAULT_PAGE_SIZE;

        pageQuery.StartRow =
          (pageNo - 1) * (pageQuery.RowLimit ?? DEFAULT_PAGE_SIZE);

        sp.search(pageQuery)
          .then((response) => {
            if (!signalRef.aborted) {
              innerState.current.searchQuery = pageQuery;
              innerState.current.activePageNo = pageNo;
              setSearchResult(response);

              if (callback) {
                setTimeout(() => {
                  callback(createSPSearchResult(response, pageNo));
                }, 0);
              }
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              setSearchResult(null);

              if (callback) {
                setTimeout(() => {
                  callback(undefined, err);
                }, 0);
              }

              if (innerState.current.options) {
                errorHandler(err, innerState.current.options);
              } else {
                console.error(err);
              }
            }
          });
      } else {
        console.warn(
          "useSearch is currently disabled, get result page dispatch is ignored.",
        );
      }
    },
    [],
  );

  useEffect(() => abortSource.current.abort(), []);

  useEffect(() => {
    const opts = mergeOptions(globalOptions, options);
    innerState.current.disabled = checkDisable(opts?.disabled, searchQuery);

    if (innerState.current.disabled) {
      abortSource.current.abort();
    } else {
      const extDeps = mergeDependencies([searchQueryKey(searchQuery)], deps);
      const shouldUpdate =
        !compareTuples(innerState.current.externalDeps, extDeps) ||
        !deepCompareOptions(innerState.current.options, opts);

      if (shouldUpdate) {
        abortSource.current.abort();
        abortSource.current.reset();

        innerState.current.searchQuery = undefined;
        innerState.current.activePageNo = 0;

        if (opts.keepPreviousState !== true) {
          setSearchResult(undefined);
        }

        const sp = resolveSP(opts, [InjectAbortSignal(abortSource.current)]);
        const signalRef = abortSource.current.signal;
        const query = parseQuery(searchQuery);

        sp.search(query)
          .then((response) => {
            if (!signalRef.aborted) {
              innerState.current.searchQuery = query;
              innerState.current.activePageNo = 0;
              setSearchResult(response);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              setSearchResult(null);
              errorHandler(err, opts);
            }
          });
      }

      innerState.current.externalDeps = extDeps;
      innerState.current.options = opts;
    }
  }, [searchQuery, options, globalOptions, deps]);

  switch (searchResult) {
    case undefined:
      return [undefined, getPageDispatch];
    case null:
      return [null, getPageDispatch];
    default:
      return [
        createSPSearchResult(searchResult, innerState.current.activePageNo),
        getPageDispatch,
      ];
  }
}
