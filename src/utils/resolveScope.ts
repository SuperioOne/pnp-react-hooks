import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { IItem } from "@pnp/sp/items/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Override } from "../types";
import { resolveList } from "./resolveList";
import { assert } from ".";

interface ScopeInfo
{
    item?: number;
    list?: string;
}

type ItemScope = Override<ScopeInfo, "item", number>;
type AnyScope = Override<ScopeInfo, "item", number | undefined>;
type ListOrWebScope = Omit<ScopeInfo, "item">;
type ListScope = Override<Omit<ScopeInfo, "item">, "list", string>;
type WebScope = Omit<Omit<ScopeInfo, "item">, "list">;

export function resolveScope(web: IWeb, scopeInfo?: ItemScope): IItem;
export function resolveScope(web: IWeb, scopeInfo?: AnyScope): IWeb | IList | IItem;
export function resolveScope(web: IWeb, scopeInfo?: ListScope): IList;
export function resolveScope(web: IWeb, scopeInfo?: WebScope): IWeb;
export function resolveScope(web: IWeb, scopeInfo?: ListOrWebScope): IWeb | IList;
export function resolveScope(web: IWeb, scopeInfo?: ScopeInfo): IWeb | IList | IItem
{
    if (scopeInfo?.list)
    {
        const scope = resolveList(web, scopeInfo.list);

        if (scopeInfo.item)
        {
            assert(!isNaN(scopeInfo.item) && scopeInfo.item > 0
                , "Can't get item scope. Item id is defined but it's not in a valid range");

            return scope.items.getById(scopeInfo.item);
        }

        return scope;
    }
    else
    {
        return web;
    }
}