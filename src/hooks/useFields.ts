import "@pnp/sp/fields";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, mergeDependencies, resolveScope } from "../utils";
import { useState, useCallback } from "react";

export interface FieldsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useFields(
    options?: FieldsOptions,
    deps?: React.DependencyList): Nullable<Array<IFields>>
{
    const [fields, setFields] = useState<Nullable<Array<IFields>>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.fields);

    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list], deps);

    useQueryEffect(invokableFactory, setFields, options, _mergedDeps);

    return fields;
}