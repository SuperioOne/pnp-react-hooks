import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type WebPropertiesOptions = PnpHookOptions<ODataQueryable>;

export function useWebProperties<T>(
    options?: WebPropertiesOptions,
    deps?: React.DependencyList): Nullable<T>
{
    const globalOptions = useContext(InternalContext);
    const [properties, setProperties] = useState<Nullable<T>>();

    const invokableFactory = useCallback(async (web: IWeb) => createInvokable(web.allProperties), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setProperties, _options, deps);

    return properties;
}