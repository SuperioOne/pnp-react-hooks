import "@pnp/sp/fields";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { isUUID } from "../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveScope } from "../utils/resolveScope";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { InternalContext } from "../context";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { DisableOptionValueType } from "../types/options/RenderOptions";

export interface FieldOptions extends PnpHookOptions<ODataQueryable>
{
    list?: string;
    disabled?: DisableOptionValueType | { (fieldId: string): boolean };
}

export function useField(
    fieldId: string,
    options?: FieldOptions,
    deps?: React.DependencyList): Nullable<IFields>
{
    const globalOptions = useContext(InternalContext);
    const [field, setField] = useState<Nullable<IFields>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assertString(fieldId, "fileId is not a valid string.");

        const scope = resolveScope(web, {
            list: options?.list
        });

        if (isUUID(fieldId))
        {
            return createInvokable(scope.fields.getById(fieldId));
        }
        else
        {
            return createInvokable(scope.fields.getByInternalNameOrTitle(fieldId));
        }
    }, [options?.list, fieldId]);

    const _mergedDeps = mergeDependencies([fieldId, options?.list], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, fieldId);

        return opt;
    }, [fieldId, globalOptions, options]);

    useQueryEffect(invokableFactory, setField, _options, _mergedDeps);

    return field;
}