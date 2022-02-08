import { IWeb, IWebInfosData } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type SubWebInfosOptions = PnpHookOptions<ODataQueryableCollection>;

export function useSubWebInfos(
    options?: SubWebInfosOptions,
    deps?: React.DependencyList): Nullable<IWebInfosData[]>
{
    const globalOptions = useContext(InternalContext);
    const [subWebs, setSubWebs] = useState<Nullable<IWebInfosData[]>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.webinfos), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setSubWebs, _options, deps);

    return subWebs;
}