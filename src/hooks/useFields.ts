import "@pnp/sp/fields";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveScope } from "../utils/resolveScope";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export interface FieldsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useFields(
    options?: FieldsOptions,
    deps?: React.DependencyList): Nullable<IFields[]>
{
    const [fields, setFields] = useState<Nullable<IFields[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.fields);

    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list], deps);

    useQueryEffect(invokableFactory, setFields, options, _mergedDeps);

    return fields;
}