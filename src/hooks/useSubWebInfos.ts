import { IWeb, IWebInfo } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type SubWebInfosOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSubWebInfos(
    options?: SubWebInfosOptions,
    deps?: React.DependencyList): Nullable<IWebInfo>
{
    const [subWebs, setSubWebs] = useState<Nullable<IWebInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.webinfos), []);

    useQueryEffect(invokableFactory, setSubWebs, options, deps);

    return subWebs;
}