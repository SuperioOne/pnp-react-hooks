import "@pnp/sp/fields";
import { useQueryEffect } from "./internal/useQuery";
import { IFields } from "@pnp/sp/fields/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryableCollection, PnpHookOptions } from "../types";
import { createInvokable, resolveList } from "../utils";
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

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const queryInstance = (typeof options?.list === "string" ? resolveList(web, options.list) : web)
            .fields;

        return createInvokable(queryInstance);

    }, [options?.list]);

    const mergedDeps = deps
        ? [options?.list].concat(deps)
        : [options?.list];

    useQueryEffect(invokableFactory, setFields, options, mergedDeps);

    return fields;
}