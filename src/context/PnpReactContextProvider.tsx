import * as React from "react";
import { CacheOptions, ExceptionOptions, RenderOptions, WebOptions } from "../types/options";
import { shallowEqual } from "../utils/shallowEqual";

export interface PnpHookGlobalOptions extends CacheOptions, ExceptionOptions, RenderOptions, WebOptions
{
    // Enable cache with using Pnp global cache options
    useCache?: boolean
}

const DEFAULT_OPTIONS: PnpHookGlobalOptions = {};

export const InternalContext = React.createContext<PnpHookGlobalOptions>(DEFAULT_OPTIONS);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PnpReactOptionProvider(props: { value: PnpHookGlobalOptions, children: any })
{
    const previousValue = React.useRef<PnpHookGlobalOptions>(props.value);

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
    }, [props.value]);

    return (
        <InternalContext.Provider value={value}>
            {props.children}
        </InternalContext.Provider>);
}