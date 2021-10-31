import { useState, useCallback } from "react";
import { useQueryEffect } from "./internal/useQueryEffect";
import { createInvokable } from "../utils/createInvokable";
import { PnpHookOptions } from "../types/options";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { Nullable } from "../types/utilityTypes";
import { IWeb } from "@pnp/sp/webs/types";
import { IListInfo } from "@pnp/sp/lists/types";

export type ListsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useLists(
    options?: ListsOptions,
    deps?: React.DependencyList): Nullable<IListInfo[]>
{
    const [lists, setLists] = useState<Nullable<IListInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.lists), []);

    useQueryEffect(invokableFactory, setLists, options, deps);

    return lists;
}