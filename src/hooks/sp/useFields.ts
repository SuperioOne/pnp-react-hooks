import "@pnp/sp/fields";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveScope } from "../../utils/resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FieldsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    /**
     * List GUID Id or title for getting list fields. Keep undefined for web fields. 
     * Changing list value resends request.
     */
    list?: string;
}

/**
 * Returns field collection from web or list.
 * @param options PnP hook options.
 * @param deps useFields will resend request when one of the dependencies changed.
 */
export function useFields(
    options?: FieldsOptions,
    deps?: React.DependencyList): Nullable<IFieldInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [fields, setFields] = useState<Nullable<IFieldInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const scope = resolveScope(sp.web, { list: options?.list });
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