import * as React from "react";
import { useContext } from "react";
import { InternalContext, PnpHookGlobalOptions } from "../../../src/context";
import { TestComponentProps } from "../ReactDOMElement";

export function GlobalContextMockup(props: TestComponentProps<PnpHookGlobalOptions>)
{
    const globalOptions = useContext(InternalContext);

    props.success?.(globalOptions);

    return (<div></div>);
}