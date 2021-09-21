import { IItem } from "@pnp/sp/items/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ItemScope, ListScope, ScopeInfo, WebScope } from "../types/ScopeInfo";
import { resolveList } from "./resolveList";

export function resolveScope<T extends ListScope>(web: IWeb, scopeInfo?: T): IList | IWeb;
export function resolveScope<T extends ItemScope>(web: IWeb, scopeInfo?: T): IItem;
export function resolveScope<T extends ScopeInfo>(web: IWeb, scopeInfo?: T): IItem | IWeb | IList
{
    if (scopeInfo?.list)
    {
        const scope = resolveList(web, scopeInfo.list);

        if (isItemScope(scopeInfo) && scopeInfo.item)
        {
            return scope.items.getById(scopeInfo.item);
        }

        return scope;
    }
    else
    {
        return web;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isItemScope(parameter: any): parameter is ItemScope 
{
    return parameter
        && Reflect.has(parameter, "item")
        && Reflect.has(parameter, "list");
}