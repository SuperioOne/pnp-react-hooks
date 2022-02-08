import { IWeb, IWebInfo } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type WebInfoOptions = PnpHookOptions<ODataQueryable>;

export function useWebInfo(
    options?: WebInfoOptions,
    deps?: React.DependencyList): Nullable<IWebInfo>
{
    const globalOptions = useContext(InternalContext);
    const [webInfo, setWebInfo] = useState<Nullable<IWebInfo>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setWebInfo, _options, deps);

    return webInfo;
}