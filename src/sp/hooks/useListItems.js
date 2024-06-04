import "@pnp/sp/items";
import {
  AbortSignalSource,
  InjectAbortSignal,
} from "../../behaviors/internals";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { compareTuples } from "../../utils/compare";
import { deepCompareOptions } from "../deepCompare";
import { errorHandler } from "../errorHandler";
import { insertODataQuery } from "../insertODataQuery";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveList } from "../resolveList";
import { resolveSP } from "../resolveSP";
import { useState, useCallback, useContext, useEffect, useRef } from "react";

/** @type{{Default: 0; All: 1; Paged:2}} **/
export const ItemRequestOptions = {
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
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").ListItemsOptions} [options] - PnP hook options for all items request.
 * @param {import("react").DependencyList} [deps] - useListItems refreshes response data when one of the dependencies changes.
 * @returns {T[] |null | undefined}
 */
/**
 * Returns items from specified list with paging support.
 *
 * @template T
 * @overload
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").PagedItemsOptions} [options] - PnP hook options for all items request.
 * @param {import("react").DependencyList} [deps] - useListItems refreshes response data when one of the dependencies changes.
 * @returns {[T[] |null | undefined, NextPageDispatch<T>, boolean]}
 */
/**
 * Returns all item collection from specified list.
 *
 * @template T
 * @overload
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").AllItemsOptions} [options] - PnP hook options for all items request.
 * @param {import("react").DependencyList} [deps] - useListItems refreshes response data when one of the dependencies changes.
 * @returns {T[] |null | undefined}
 * @deprecated
 */
/**
 * @template T
 * @param {string} list - List GUID Id or title. Changing the value resends request.
 * @param {import("./options").BaseListItemsOptions} [options] - PnP hook options for all items request.
 * @param {import("react").DependencyList} [deps] - useListItems refreshes response data when one of the dependencies changes.
 * @returns {ListItemsReturnType<T>}
 */
export function useListItems(list, options, deps) {
  /**
   * Internal hook state definition
   *
   * @typedef _HookState
   * @property {import("../types.private").InternalPnpHookOptions | null | undefined} options
   * @property {import("react").DependencyList | null | undefined} externalDeps
   * @property {string | undefined | null} list
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
    }),
  );

  /** @type{import("react").MutableRefObject<AsyncIterator<T[]> | undefined>} **/
  const pagedIterator = useRef();

  /** @type{import("react").MutableRefObject<AbortSignalSource>} **/
  const abortController = useRef(new AbortSignalSource());

  useEffect(() => abortController.current.abort(), []);

  const nextPageDispatch = useCallback(
    /** @type{NextPageDispatch<T>} **/ (callback) => {
      if (
        pagedIterator.current &&
        innerState.current.options?.disabled !== true
      ) {
        abortController.current.abort();
        abortController.current.reset();
        const signalRef = abortController.current.signal;

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
      }
    },
    [],
  );

  useEffect(() => {
    const opts = mergeOptions(globalOptions, options);
    opts.disabled = checkDisable(opts.disabled, list);

    if (opts.disabled !== true) {
      const extDeps = mergeDependencies([list], deps);
      const shouldUpdate =
        !deepCompareOptions(innerState.current.options, opts) ||
        !compareTuples(innerState.current.externalDeps, extDeps);

      if (shouldUpdate) {
        pagedIterator.current = undefined;
        abortController.current.abort();
        abortController.current.reset();

        if (options?.keepPreviousState !== true) {
          setState((prev) => ({ ...prev, items: undefined }));
        }

        const sp = resolveSP(opts, [
          InjectAbortSignal(abortController.current),
        ]);

        const spList = resolveList(sp.web, list);
        const items = insertODataQuery(spList.items, opts.query);

        /** @type{() => Promise<T[] | IteratorResult<T[]>>} **/
        let request;
        /** @type{(arg0:any) => void} **/
        let done;

        switch (options?.mode) {
          case ItemRequestOptions.Paged: {
            const iterator = items[Symbol.asyncIterator]();
            request = async () => {
              const firstPage = await iterator.next();
              return firstPage;
            };

            done = (/** @type{IteratorResult<T[]>}**/ results) => {
              pagedIterator.current = iterator;
              setState({
                type: "paged",
                items: results.value,
                done: results.done,
              });
            };

            break;
          }
          case ItemRequestOptions.All: {
            request = async () => {
              /** @type{T[]} **/
              let pages = [];

              for await (const page of items) {
                pages = pages.concat(page);
              }

              return pages;
            };
            done = (/** @type{T[]} **/ result) =>
              setState({
                type: "once",
                items: result,
                done: true,
              });

            break;
          }
          case ItemRequestOptions.Default:
          default: {
            request = items;
            done = (/** @type{T[]}**/ result) =>
              setState({
                type: "once",
                items: result,
                done: true,
              });

            break;
          }
        }

        const signalRef = abortController.current.signal;

        request()
          .then((response) => {
            if (!signalRef.aborted) {
              done(response);
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
