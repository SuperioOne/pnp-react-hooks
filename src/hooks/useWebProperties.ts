import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable } from "../utils";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";
import { WebInfoOptions } from "./useWebInfo";

export type WebPropertiesOptions = PnpHookOptions<ODataQueryable>;

export function useWebProperties<T>(
    options?: WebInfoOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const [properties, setProperties] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.allProperties), []);

    useQueryEffect(invokableFactory, setProperties, options, deps);

    return properties;
}