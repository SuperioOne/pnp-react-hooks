import "@pnp/sp/content-types";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../utils/checkDisable";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemContentTypeOptions extends PnpHookOptions<ODataQueryableCollection>
{
    /**
     * List GUID Id or title for getting list changes. Keep undefined for web changes. 
     * Changing this value resends request.
     */
    list?: string;
}

/**
 * Returns content types of web or list. Use {@link ItemContentTypeOptions.list} property to get list content 
 * types instead of web content types.
 * @param options PnP hook options.
 * @param deps useContentTypes will resend request when one of the dependencies changed.
 * @returns array of {@link IContentTypeInfo}.
 */
export function useContentTypes(
    options?: ItemContentTypeOptions,
    deps?: React.DependencyList): Nullable<IContentTypeInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [contentTypes, setContentTypes] = useState<Nullable<IContentTypeInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const scope = resolveScope(sp.web, { list: options?.list });
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