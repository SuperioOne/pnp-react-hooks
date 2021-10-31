import "@pnp/sp/content-types";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { useState, useCallback } from "react";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveScope } from "../utils/resolveScope";

export interface ItemCommentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useContentTypes(
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<IContentTypeInfo[]>
{
    const [contentTypes, setContentTypes] = useState<Nullable<IContentTypeInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.contentTypes);

    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list], deps);

    useQueryEffect(invokableFactory, setContentTypes, options, _mergedDeps);

    return contentTypes;
}