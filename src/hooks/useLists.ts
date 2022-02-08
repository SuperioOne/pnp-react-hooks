import { IListInfo } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type ListsOptions = PnpHookOptions<ODataQueryableCollection>;

export function useLists(
    options?: ListsOptions,
    deps?: React.DependencyList): Nullable<IListInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [lists, setLists] = useState<Nullable<IListInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.lists), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setLists, _options, deps);

    return lists;
}