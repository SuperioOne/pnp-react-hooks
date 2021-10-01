import { IWeb, IWebInfosData } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type SubWebInfosOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSubWebInfos(
    options?: SubWebInfosOptions,
    deps?: React.DependencyList): Nullable<IWebInfosData[]>
{
    const [subWebs, setSubWebs] = useState<Nullable<IWebInfosData[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.webinfos), []);

    useQueryEffect(invokableFactory, setSubWebs, options, deps);

    return subWebs;
}