import * as React from "react";
import { useContext } from "react";
import { InternalContext } from "../../../src/context";
import { PnpHookGlobalOptions } from "../../../src/types";
import { TestComponentProps } from "../ReactDOMElement";

export function GlobalContextMockup(props: TestComponentProps<PnpHookGlobalOptions>) {
    const globalOptions = useContext(InternalContext);
    props.success?.(globalOptions);
    return (<div></div>);
}
