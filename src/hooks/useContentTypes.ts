import "@pnp/sp/content-types";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, resolveScope } from "../utils";
import { useState, useCallback } from "react";
import { IContentTypeInfo } from "@pnp/sp/content-types";

export interface ItemCommentsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useContentTypes(
    options?: ItemCommentsOptions,
    deps?: React.DependencyList): Nullable<Array<IContentTypeInfo>>
{
    const [contentTypes, setContentTypes] = useState<Nullable<Array<IContentTypeInfo>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.contentTypes);

    }, [options?.list]);

    const _mergedDeps = deps
        ? [options?.list].concat(deps)
        : [options?.list];

    useQueryEffect(invokableFactory, setContentTypes, options, _mergedDeps);

    return contentTypes;
}