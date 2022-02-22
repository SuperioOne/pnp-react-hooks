import "@pnp/sp/fields";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { assertString } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { isUUID } from "../../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveScope } from "../../utils/resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FieldOptions extends PnpHookOptions<ODataQueryable>
{
    /**
     * List GUID Id or title for getting list field. Keep undefined for web field.
     * Changing list value resends request.
     */
    list?: string;
    disabled?: DisableOptionValueType | { (fieldId: string): boolean };
}

/**
 * Returns a field from web or list.
 * @param fieldId Field internal name or Id. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useField will resend request when one of the dependencies changed.
 */
export function useField(
    fieldId: string,
    options?: FieldOptions,
    deps?: React.DependencyList): Nullable<IFieldInfo>
{
    const globalOptions = useContext(InternalContext);
    const [field, setField] = useState<Nullable<IFieldInfo>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assertString(fieldId, "fileId is not a valid string.");

        const scope = resolveScope(sp.web, {
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