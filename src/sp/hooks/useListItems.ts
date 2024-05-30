import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { DisableOptionType, DisableOptionValueType } from "../../types";
import { IItems, Items } from "@pnp/sp/items";
import { InjectAbort, ManagedAbort } from "../../behaviors/internals";
import { InternalContext } from "../../context";
import { ODataQueryableCollection, FilteredODataQueryable } from "../types";
import { PnpHookOptions, _PnpHookOptions } from "../types";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { compareTuples } from "../../utils/compare";
import { deepCompareOptions } from "../deepCompare";
import { errorHandler } from "../errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { insertODataQuery } from "../insertODataQuery";
import { mergeOptions } from "../merge";
import { parseODataJSON } from "@pnp/queryable";
import { resolveList } from "../resolveList";
import { resolveSP } from "../resolveSP";
import { useState, useCallback, useContext, useEffect, useRef } from "react";

export enum ListOptions {
  /**
   * Fetch list items in single request. Request might fail due to threshold limit, if data is not indexed and filtered properly.
   * see https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint
   */
  Default = 0,

  /** Fetches list items in multiple calls and merges the results on the client side. */
  All = 1,

  /** Fetch list items with paging support. */
  Paged = 2,
}

export type nextPageDispatch = (callback?: () => void) => void;

interface _ListItemsOptions extends PnpHookOptions<ODataQueryableCollection> {
  mode?: ListOptions;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface ListItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  mode?: ListOptions.Default;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface AllItemsOptions
  extends PnpHookOptions<FilteredODataQueryable> {
  mode: ListOptions.All;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface PagedItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  mode?: ListOptions.Paged;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface PagedItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

/**
 * Returns all item collection from specified list.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options for all items request.
 * @param deps useListItems refreshes response data when one of the dependencies changes.
 */
export function useListItems<T>(
  list: string,
  options?: AllItemsOptions,
  deps?: React.DependencyList,
): T[] | null | undefined;

/**
 * Returns item collection from specified list.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useListItems refreshes response data when one of the dependencies changes.
 */
export function useListItems<T>(
  list: string,
  options?: ListItemsOptions,
  deps?: React.DependencyList,
): T[] | null | undefined;

/**
 * Returns items from specified list with paging support.
 * @param list List GUID Id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useListItems refreshes response data when one of the dependencies changes.
 */
export function useListItems<T>(
  list: string,
  options?: PagedItemsOptions,
  deps?: React.DependencyList,
): [T[] | null | undefined, nextPageDispatch, boolean];

export function useListItems<T>(
  list: string,
  options?: _ListItemsOptions,
  deps?: React.DependencyList,
):
  | T[]
  | null
  | undefined
  | [T[] | null | undefined, nextPageDispatch, boolean | undefined] {
  const globalOptions = useContext(InternalContext);
  const [state, setState] = useState<
    | T[]
    | null
    | undefined
    | [T[] | null | undefined, nextPageDispatch, boolean | undefined]
  >();
  const [next, setNext] = useState<NextPageCall>();

  const _innerState = useRef<_TrackedState>({
    externalDeps: null,
    list: null,
    url: null,
    options: null,
  });

  const _subscription = useRef<Subscription | null | undefined>(undefined);
  const _disabled = useRef<DisableOptionType | undefined>(options?.disabled);
  const _abortController = useRef<ManagedAbort>(new ManagedAbort());

  const _cleanup = useCallback(() => {
    _subscription.current?.unsubscribe();
    _subscription.current = undefined;
    _abortController.current?.abort();
  }, []);

  useEffect(() => _cleanup, [_cleanup]);

  const nextDispatch: nextPageDispatch = useCallback(
    (callback?: () => void) => {
      if (_innerState.current.url && _disabled.current !== true) {
        setNext({
          url: _innerState.current.url,
          callback: callback,
        });
      }
    },
    [],
  );

  useEffect(() => {
    const mergedOptions = mergeOptions(globalOptions, options);
    _disabled.current = checkDisable(
      mergedOptions?.disabled,
      defaultCheckDisable,
      list,
    );

    if (_disabled.current !== true) {
      const shouldUpdate =
        _innerState.current.list !== list ||
        !deepCompareOptions(_innerState.current.options, mergedOptions) ||
        !compareTuples(_innerState.current.externalDeps, deps);

      if (next || shouldUpdate) {
        _cleanup();
        _abortController.current = new ManagedAbort();

        if (options?.keepPreviousState !== true) {
          setState(undefined);
        }

        // clear next on render.
        if (next) {
          setNext(undefined);
        }

        setTimeout(async () => {
          try {
            let request: () => Promise<T[] | ItemsResponse>;
            let nextCall: (value: any) => void;

            const sp = resolveSP(mergedOptions, [
              InjectAbort(_abortController.current),
            ]);
            const spList = resolveList(sp.web, list);

            if (next) {
              request = Items([spList.items, next.url], "").using(
                _customParserBehavior(),
              );
              nextCall = (value: ItemsResponse) => {
                _innerState.current.url = value.url;
                setState([value.data, nextDispatch, !!value.url]);
                next.callback?.();
              };
            } else {
              _innerState.current.url = undefined;

              const items = insertODataQuery(spList.items, mergedOptions.query);

              switch (options?.mode) {
                case ListOptions.Paged: {
                  request = items.using(_customParserBehavior());
                  nextCall = (value: ItemsResponse) => {
                    _innerState.current.url = value.url;
                    setState([value.data, nextDispatch, !!value.url]);
                  };
                  break;
                }
                case ListOptions.All: {
                  request = () => items.getAll();
                  nextCall = (value: T[]) => setState(value);
                  break;
                }
                case ListOptions.Default:
                default: {
                  request = items;
                  nextCall = (value: T[]) => setState(value);
                  break;
                }
              }
            }

            const observer: NextObserver<T[] | ItemsResponse> = {
              next: nextCall,
              complete: _cleanup,
              error: (err: Error) => {
                if (err.name !== "AbortError") {
                  setState(null);
                  errorHandler(err, mergedOptions);
                }
              },
            };

            _subscription.current = from(request()).subscribe(observer);
          } catch (err) {
            errorHandler(err, mergedOptions);
          }
        });
      }

      _innerState.current.externalDeps = deps;
      _innerState.current.list = list;
      _innerState.current.options = mergedOptions;
    }
  }, [next, list, options, deps, globalOptions, _cleanup, nextDispatch]);

  if (options?.mode === ListOptions.Paged) {
    switch (state) {
      case undefined:
        return [undefined, nextDispatch, undefined];
      case null:
        return [null, nextDispatch, undefined];
      default:
        return state;
    }
  } else {
    return state;
  }
}

interface ItemsResponse {
  url?: string;
  data: any;
}

interface NextPageCall {
  url: string;
  callback?: () => void;
}

// Based on PageItemParser
function _customParserBehavior() {
  return (instance: IItems) => {
    instance.on.parse.clear();
    instance.on.parse(
      async (
        url: URL,
        response: Response,
        result: ItemsResponse,
      ): Promise<[URL, Response, any]> => {
        if (!response.ok) {
          throw new Error(
            `Http request failed with ${response.status}: ${url.toString()}`,
          );
        }

        if (typeof result === "undefined") {
          const json = await response.json();
          const nextUrl =
            Reflect.has(json, "d") && Reflect.has(json.d, "__next")
              ? json.d.__next
              : json["odata.nextLink"];

          result = {
            data: parseODataJSON(json),
            url: nextUrl,
          };
        }

        return [url, response, result];
      },
    );

    return instance;
  };
}

interface _TrackedState {
  url: string | null | undefined;
  list: string | null | undefined;
  options: _PnpHookOptions | null | undefined;
  externalDeps: React.DependencyList | null | undefined;
}
