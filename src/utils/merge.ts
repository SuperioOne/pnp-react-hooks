import { PnpHookGlobalOptions } from "../context/PnpReactContextProvider";
import { PnpHookOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";

export function mergeDependencies(deps: Readonly<unknown[]>, ...additionalDeps: Array<Readonly<undefined | unknown[]>>)
{
    return deps.concat(...additionalDeps.filter(e => e !== undefined));
}

export function mergeOptions<TQuery>(globalOptions: PnpHookGlobalOptions, options: PnpHookOptions<Nullable<TQuery>> | undefined)
{
    return options
        ? { ...globalOptions, ...options }
        : { ...globalOptions };
}