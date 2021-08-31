import * as React from "react";
import { CacheOptions, ExceptionOptions, RenderOptions, WebOptions } from "../types";
import { shallowEqual } from "../utils";

export interface PnpReactOptions extends CacheOptions, ExceptionOptions, RenderOptions, WebOptions { }

const DEFAULT_OPTIONS: PnpReactOptions = {};

export const InternalContext = React.createContext<PnpReactOptions>(DEFAULT_OPTIONS);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PnpReactOptionProvider(props: { value: PnpReactOptions, children: any })
{
    const previousValue = React.useRef<PnpReactOptions>(DEFAULT_OPTIONS);

    const value = React.useMemo(() =>
    {
        if (shallowEqual(props.value, previousValue.current))
        {
            return previousValue.current;
        }
        else
        {
            previousValue.current = props.value;
            return props.value;
        }
    }, [props]);


    return (
        <InternalContext.Provider value={value}>
            {props.children}
        </InternalContext.Provider>);
}