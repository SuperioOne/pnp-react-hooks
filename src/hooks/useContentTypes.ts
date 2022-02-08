import "@pnp/sp/content-types";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemContentTypeOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useContentTypes(
    options?: ItemContentTypeOptions,
    deps?: React.DependencyList): Nullable<IContentTypeInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [contentTypes, setContentTypes] = useState<Nullable<IContentTypeInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.contentTypes);
    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setContentTypes, _options, _mergedDeps);

    return contentTypes;
}