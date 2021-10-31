import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type WebPropertiesOptions = PnpHookOptions<ODataQueryable>;

export function useWebProperties<T>(
    options?: WebPropertiesOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [properties, setProperties] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.allProperties), []);

    useQueryEffect(invokableFactory, setProperties, options, deps);

    return properties;
}