import { PnpHookGlobalOptions, PnpHookOptions, _PnpHookOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";

export function mergeDependencies(deps: Readonly<unknown[]>, ...additionalDeps: Array<Readonly<undefined | unknown[]>>)
{
    return deps.concat(...additionalDeps.filter(e => e !== undefined));
}

export function mergeOptions<TQuery>(
    globalOptions: PnpHookGlobalOptions,
    options: PnpHookOptions<Nullable<TQuery>> | undefined): _PnpHookOptions<Nullable<TQuery>>
{
    return options
        ? { ...globalOptions, ...options }
        : { ...globalOptions };
}