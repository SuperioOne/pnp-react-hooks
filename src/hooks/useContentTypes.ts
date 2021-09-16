import "@pnp/sp/content-types";
import { useQueryEffect } from "./internal/useQuery";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, resolveList } from "../utils";
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

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = (typeof options?.list === "string" ? resolveList(web, options.list) : web)
            .contentTypes;

        return createInvokable(queryInstance);

    }, [options?.list]);

    const mergedDeps = deps
        ? [options?.list].concat(deps)
        : [options?.list];

    useQueryEffect(invokableFactory, setContentTypes, options, mergedDeps);

    return contentTypes;
}