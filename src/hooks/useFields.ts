import "@pnp/sp/fields";
import { IFieldInfo } from "@pnp/sp/fields/types";
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

export interface FieldsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useFields(
    options?: FieldsOptions,
    deps?: React.DependencyList): Nullable<IFieldInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [fields, setFields] = useState<Nullable<IFieldInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const scope = resolveScope(web, { list: options?.list });

        return createInvokable(scope.fields);
    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setFields, _options, _mergedDeps);

    return fields;
}