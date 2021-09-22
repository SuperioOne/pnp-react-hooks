import "@pnp/sp/fields";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable, isUUID, resolveScope } from "../utils";
import { useState, useCallback } from "react";
import { ParameterError } from "../errors/ParameterError";

export interface FieldOptions extends PnpHookOptions<ODataQueryable>
{
    list?: string;
}

export function useField(
    fieldId: string,
    options?: FieldOptions,
    deps?: React.DependencyList): Nullable<IFields>
{
    const [field, setField] = useState<Nullable<IFields>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (!fieldId)
            throw new ParameterError("useField: fieldId value is neither unique id or relative url.", "fieldId", fieldId);

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

    const _mergedDeps = deps
        ? [fieldId, options?.list].concat(deps)
        : [fieldId, options?.list];

    useQueryEffect(invokableFactory, setField, options, _mergedDeps);

    return field;
}