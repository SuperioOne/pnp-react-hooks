import "@pnp/sp/fields";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { assertString, createInvokable, isUUID, mergeDependencies, resolveScope } from "../utils";
import { useState, useCallback } from "react";

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

    useQueryEffect(invokableFactory, setField, options, _mergedDeps);

    return field;
}