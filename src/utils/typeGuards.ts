import { _SPCollection } from "@pnp/sp";
import { SearchQueryInit, ISearchBuilder } from "@pnp/sp/search/types";
import { SharepointQueryable } from "../types/SharepointQueryable";

export function isReactDependencyList(obj: unknown): obj is React.DependencyList
{
    return Array.isArray(obj);
}

export function isQueryableCollection(instance: Readonly<SharepointQueryable>): instance is _SPCollection
{
    const queryableCollection = <_SPCollection>instance;

    return typeof queryableCollection.skip === "function"
        && typeof queryableCollection.orderBy === "function"
        && typeof queryableCollection.top === "function";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFilterable(instance: any): instance is { filter: (f: string) => unknown; }
{
    return typeof instance.filter === "function";
}

export function isSearchQueryBuilder(query: SearchQueryInit): query is ISearchBuilder
{
    return typeof (<ISearchBuilder>query).toSearchQuery === "function";
}