import { _SPCollection } from "@pnp/sp";
import { SharepointQueryable } from "../types/SharepointQueryable";

export function isReactDependencyList(obj: unknown): obj is React.DependencyList
{
    return Array.isArray(obj);
}

export function isQueryableCollection(instance: Readonly<SharepointQueryable>): instance is _SPCollection
{
    const queryableCollection = instance as _SPCollection;

    return typeof queryableCollection.skip === "function"
        && typeof queryableCollection.orderBy === "function"
        && typeof queryableCollection.top === "function";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFilterable(instance: any): instance is { filter: (f: string) => unknown }
{
    return typeof instance.filter === "function";
}