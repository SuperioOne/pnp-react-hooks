import { IListInfo } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type ListsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useLists(
    options?: ListsOptions,
    deps?: React.DependencyList): Nullable<Array<IListInfo>>
{
    const [lists, setLists] = useState<Nullable<Array<IListInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.lists), []);

    useQueryEffect(invokableFactory, setLists, options, deps);

    return lists;
}