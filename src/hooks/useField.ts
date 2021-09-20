import "@pnp/sp/fields";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, isUUID, resolveList } from "../utils";
import { useState, useCallback } from "react";
import { ParameterError } from "../errors/ParameterError";

export interface FieldOptions extends PnpHookOptions<ODataQueryableCollection>
{
    list?: string;
}

export function useField(
    fieldIdentifier: string,
    options?: FieldOptions,
    deps?: React.DependencyList): Nullable<IFields>
{
    const [field, setField] = useState<Nullable<IFields>>();

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (!fieldIdentifier)
            throw new ParameterError("useField: fieldIdentifier value is neither unique id or relative url.", "fieldIdentifier", fieldIdentifier);

        const scope = (typeof options?.list === "string" ? resolveList(web, options.list) : web)
            .fields;

        if (isUUID(fieldIdentifier))
        {
            return createInvokable(scope.getById(fieldIdentifier));
        }
        else
        {
            return createInvokable(scope.getByInternalNameOrTitle(fieldIdentifier));
        }

    }, [options?.list, fieldIdentifier]);

    const mergedDeps = deps
        ? [fieldIdentifier, options?.list].concat(deps)
        : [fieldIdentifier, options?.list];

    useQueryEffect(invokableFactory, setField, options, mergedDeps);

    return field;
}