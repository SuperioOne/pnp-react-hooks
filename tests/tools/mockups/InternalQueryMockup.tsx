import "@pnp/sp/webs";
import * as React from "react";
import { BehaviourOptions } from "../../../src/types/options/BehaviourOptions";
import { ContextOptions, RenderOptions } from "../../../src/types/options";
import { Nullable } from "../../../src/types/utilityTypes";
import { PnpActionFunction } from "../../../src/types/PnpActionFunction";
import { SPFI } from "@pnp/sp";
import { TestComponentProps } from "../ReactDOMElement";
import { _Web } from "@pnp/sp/webs/types";
import { createInvokable } from "../../../src/utils/createInvokable";
import { useQueryEffect } from "../../../src/sp/useQueryEffect";

export function InternalQueryMockup(props: ComponentOptions) {
    const dispatch = React.useState<Nullable<unknown>>();

    const invokableFactory = React.useCallback(async (sp: SPFI) => {
        const customFunc = props.customInvoke?.(props);

        return createInvokable(sp.web, customFunc);
    }, [props]);

    // inject jest reject callback to exception handler
    const _props: ComponentOptions = { ...props, error: props.error };

    useQueryEffect(invokableFactory, dispatch[1], _props);

    return (<div></div>);
}
export interface Options extends RenderOptions, Required<ContextOptions>, BehaviourOptions {
    /** Override {@link MockupSharepointQueryable} get function */
    customInvoke?: (options: ComponentOptions) => PnpActionFunction<_Web, string>;
}
interface ComponentOptions extends Options, TestComponentProps<unknown | null> { }
