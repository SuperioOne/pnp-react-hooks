import type { IItem } from "@pnp/sp/items/types.js";
import type { IList } from "@pnp/sp/lists/types.js";
import type { IWeb } from "@pnp/sp/webs/types.js";
import type { SPFI, _SPCollection, _SPQueryable } from "@pnp/sp";
import type { ODataQueryable, ODataQueryableCollection } from "./types.js";
import type {
  BehaviourOptions,
  ContextOptions,
  ErrorOptions,
  RenderOptions,
} from "../types.js";

export type SharepointQueryable<T = any> = _SPCollection<T> | _SPQueryable<T>;
export type ScopeReturnType<TList, TItem> = TList extends string
  ? TItem extends number
    ? IItem
    : TItem extends undefined
      ? IList
      : never
  : TList extends undefined
    ? TItem extends undefined
      ? IWeb
      : never
    : never;

export interface PnpActionFunction<TContext, TResult> {
  (this: TContext, options?: RequestInit): Promise<TResult>;
}

/**
 * Composition of all options for internal usages.
 * @internal
 */
export interface InternalPnpHookOptions<
  T = null | undefined | ODataQueryableCollection | ODataQueryable,
> extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  query?: T | undefined | null;
  sp: SPFI;
}
