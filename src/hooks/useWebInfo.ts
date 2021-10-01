import { IWeb, IWebInfo } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type WebInfoOptions = PnpHookOptions<ODataQueryable>;

export function useWebInfo(
    options?: WebInfoOptions,
    deps?: React.DependencyList): Nullable<IWebInfo>
{
    const [webInfo, setWebInfo] = useState<Nullable<IWebInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web), []);

    useQueryEffect(invokableFactory, setWebInfo, options, deps);

    return webInfo;
}

