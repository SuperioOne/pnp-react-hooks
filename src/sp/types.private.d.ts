import type { IItem } from "@pnp/sp/items/types";
import type { IList } from "@pnp/sp/lists/types";
import type { IWeb } from "@pnp/sp/webs/types";
import type { _SPCollection, _SPQueryable } from "@pnp/sp";

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
