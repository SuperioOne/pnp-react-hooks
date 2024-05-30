/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { PnpHookGlobalOptions } from "../types/options";
import { SPBrowser } from "@pnp/sp/behaviors/spbrowser";
import { shallowEqual } from "../uti../../utils/compare";
import { spfi } from "@pnp/sp";

const DEFAULT_OPTIONS: PnpHookGlobalOptions = {
    sp: spfi().using(SPBrowser())
};

export const InternalContext = React.createContext<Readonly<PnpHookGlobalOptions>>(DEFAULT_OPTIONS);

export function PnpHookOptionProvider(props: { value: PnpHookGlobalOptions, children?: any; }) {
    const previousValue = React.useRef<PnpHookGlobalOptions>(props.value);

    const value = React.useMemo(() => {
        if (shallowEqual(props.value, previousValue.current)) {
            return previousValue.current;
        }
        else {
            previousValue.current = props.value;
            return props.value;
        }
    }, [props.value]);

    return (
        <InternalContext.Provider value={value}>
            {props.children}
        </InternalContext.Provider>);
}
