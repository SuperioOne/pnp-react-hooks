import * as React from "react";
import { CacheOptions, ExceptionOptions, RenderOptions, WebOptions } from "../../../src/types/options";
import { IWeb } from "@pnp/sp/webs";
import { Nullable } from "../../../src/types/utilityTypes";
import { PnpActionFunction } from "../../../src/types/PnpActionFunction";
import { TestComponentProps } from "../ReactDOMElement";
import { _Web } from "@pnp/sp/webs/types";
import { createInvokable } from "../../../src/utils/createInvokable";
import { useQueryEffect } from "../../../src/hooks/internal/useQueryEffect";

export function InternalQueryMockup(props: ComponentOptions)
{
    const dispatch = React.useState<Nullable<unknown>>();

    const invokableFactory = React.useCallback(async (web: IWeb) =>
    {
        const customFunc = props.customInvoke?.(props);

        return createInvokable(web, customFunc);
    }, [props]);

    // inject jest reject callback to exception handler
    const _props: ComponentOptions = { ...props, exception: props.error };

    useQueryEffect(invokableFactory, dispatch[1], _props);

    return (<div></div>);
}
export interface Options extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    /** Override {@link MockupSharepointQueryable} get function */
    customInvoke?: (options: ComponentOptions) => PnpActionFunction<_Web, string>;
}
interface ComponentOptions extends Options, TestComponentProps<unknown | null> { }