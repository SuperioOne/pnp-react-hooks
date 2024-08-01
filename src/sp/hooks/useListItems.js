import "@pnp/sp/items";
import { AbortError } from "../../behaviors/abortError.js";
import { AbortSignalSource } from "../../behaviors/abortSignalSource.js";
import { InjectAbortSignal } from "../../behaviors/injectAbortSignal.js";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { compareTuples } from "../../utils/compare.js";
import { deepCompareOptions } from "../deepCompare.js";
import { errorHandler } from "../errorHandler.js";
import { insertODataQuery } from "../insertODataQuery.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { resolveSP } from "../resolveSP.js";
import { useState, useCallback, useContext, useEffect, useRef } from "react";

/** @import {DependencyList, Dispatch, SetStateAction,MutableRefObject} from "react" **/
/** @import {BaseListItemsOptions, PagedItemsOptions, ListItemsOptions, AllItemsOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {InternalPnpHookOptions} from "../types.private.d.ts" **/

/** @type{{Default: 0; All: 1; Paged:2}} **/
export const useListItemsMode = {
  /**
   * Fetch list items in single request. Request might fail due to threshold limit, if data is not indexed and filtered properly.
   * see https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint
   */
  Default: 0,

  /**
   * @deprecated Fetches all list items on multiple calls and merges the results on the client.
   */
  All: 1,

  /** Fetch list items with paging support. */
  Paged: 2,
};

/**
 * @template T
 * @typedef {<T>(callback?: (data: T[]| undefined, error?:unknown | undefined) => void) => void} NextPageDispatch
 */

/**
 * @template T
 * @typedef {T[] | null | undefined | [T[] |null | undefined, NextPageDispatch<T>, boolean | undefined]} ListItemsReturnType
 */

/**
 * Returns item collection from specified list.
 *
 * @template T
 * @overload
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {ListItemsOptions} [options] - Hook options for all items request.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {T[] |null | undefined}
 */
/**
 * Returns items from specified list with paging support.
 *
 * @template T
 * @overload
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {PagedItemsOptions} [options] - Hook options for all items request.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {[T[] |null | undefined, NextPageDispatch<T>, boolean]}
 */
/**
 * Returns all item collection from specified list.
 *
 * @template T
 * @overload
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {AllItemsOptions} [options] - Hook options for all items request.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {T[] |null | undefined}
 */
/**
 * @template T
 * @param {string} list - List GUID Id or title. Value is automatically tracked for changes.
 * @param {BaseListItemsOptions} [options] - Hook options for all items request.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ListItemsReturnType<T>}
 */
export function useListItems(list, options, deps) {
  /**
   * Internal hook state definition
   *
   * @typedef _HookState
   * @property {InternalPnpHookOptions | null | undefined} options
   * @property {DependencyList | null | undefined} externalDeps
   * @property {string | undefined | null} list
   * @property {boolean} disabled
   */
  /**
   * Internal result state definition
   *
   * @typedef _ResultState
   * @property {T[] | null | undefined} items
   * @property {"paged" | "once" | "error" | undefined} type
   * @property {boolean | undefined} done
   */

  const globalOptions = useContext(InternalContext);
  const [state, setState] = useState(
    /** @type{_ResultState} **/ ({
      type: undefined,
      done: undefined,
      items: undefined,
    }),
  );

  const innerState = useRef(
    /** @type{_HookState} **/ ({
      options: null,
      list: null,
      externalDeps: null,
      disabled: true,
    }),
  );

  /** @type{MutableRefObject<AsyncIterator<T[]> | undefined>} **/
  const pagedIterator = useRef();

  /** @type{MutableRefObject<AbortSignalSource>} **/
  const abortSource = useRef(new AbortSignalSource());

  useEffect(() => abortSource.current.abort(), []);

  const nextPageDispatch = useCallback(
    /** @type{NextPageDispatch<T>} **/ (callback) => {
      if (pagedIterator.current && !innerState.current.disabled) {
        abortSource.current.abort();
        abortSource.current.reset();

        const signalRef = abortSource.current.signal;

        if (innerState.current.options?.keepPreviousState !== true) {
          setState((prev) => ({ ...prev, items: undefined }));
        }

        pagedIterator.current
          .next()
          .then((result) => {
            if (signalRef.aborted) {
              return;
            }

            setState({
              items: result.value,
              done: result.done,
              type: "paged",
            });

            if (callback) {
              setTimeout(() => {
                callback(result.value, undefined);
              }, 0);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              setState({
                items: null,
                done: undefined,
                type: "error",
              });

              if (innerState.current.options) {
                errorHandler(err, innerState.current.options);
              } else {
                console.error(err);
              }

              if (callback) {
                setTimeout(() => {
                  callback(undefined, err);
                }, 0);
              }
            }
          });
      } else {
        console.warn(
          "useListItems is currently disabled, next page dispatch is ignored.",
        );
      }
    },
    [],
  );

  useEffect(() => {
    const opts = mergeOptions(globalOptions, options);
    innerState.current.disabled = checkDisable(opts.disabled, list);

    if (innerState.current.disabled) {
      abortSource.current.abort();
    } else {
      const extDeps = mergeDependencies(
        [list, options?.mode ?? useListItemsMode.Default],
        deps,
      );
      const shouldUpdate =
        !deepCompareOptions(innerState.current.options, opts) ||
        !compareTuples(innerState.current.externalDeps, extDeps);

      if (shouldUpdate) {
        pagedIterator.current = undefined;
        abortSource.current.abort();
        abortSource.current.reset();

        if (options?.keepPreviousState !== true) {
          setState((prev) => ({ ...prev, items: undefined }));
        }

        const sp = resolveSP(opts, [InjectAbortSignal(abortSource.current)]);
        const spList = resolveList(sp.web, list);
        const items = insertODataQuery(spList.items, opts.query);
        const signalRef = abortSource.current.signal;

        /** @type{() => Promise<T[] | IteratorResult<T[]>>} **/
        let request;
        /** @type{(arg0:any) => void} **/
        let complete;

        switch (options?.mode) {
          case useListItemsMode.Paged: {
            const iterator = items[Symbol.asyncIterator]();
            request = async () => {
              const firstPage = await iterator.next();
              return firstPage;
            };

            complete = (/** @type{IteratorResult<T[]>}**/ results) => {
              pagedIterator.current = iterator;
              setState({
                type: "paged",
                items: results.value,
                done: results.done,
              });
            };

            break;
          }
          case useListItemsMode.All: {
            request = async () => {
              /** @type{T[]} **/
              let pages = [];

              for await (const page of items) {
                pages = pages.concat(page);

                if (signalRef.aborted) {
                  throw new AbortError();
                }
              }

              return pages;
            };
            complete = (/** @type{T[]} **/ result) =>
              setState({
                type: "once",
                items: result,
                done: true,
              });

            break;
          }
          case useListItemsMode.Default:
          default: {
            request = items;
            complete = (/** @type{T[]}**/ result) =>
              setState({
                type: "once",
                items: result,
                done: true,
              });

            break;
          }
        }

        request()
          .then((response) => {
            if (!signalRef.aborted) {
              complete(response);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              setState({
                items: null,
                done: undefined,
                type: "error",
              });
              errorHandler(err, opts);
            }
          });
      }

      innerState.current.externalDeps = extDeps;
      innerState.current.options = opts;
      innerState.current.list = list;
    }
  }, [globalOptions, options, list, deps]);

  switch (state.type) {
    case "paged": {
      return [state.items, nextPageDispatch, state.done];
    }
    case "once": {
      return state.items;
    }
    case "error": {
      return null;
    }
    default: {
      return undefined;
    }
  }
}
