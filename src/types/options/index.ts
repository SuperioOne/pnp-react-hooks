import { ErrorOptions } from "./ExceptionOptions";
import { Nullable } from "../utilityTypes";
import { RenderOptions } from "./RenderOptions";
import { ContextOptions } from "./WebOptions";
import { BehaviourOptions } from "./BehaviourOptions";
import { ODataQueryable, ODataQueryableCollection } from "../ODataQueryable";

/**
 * Composition of all options for internal usages.
 * @internal 
 */
export interface _PnpHookOptions<T = Nullable<ODataQueryableCollection | ODataQueryable>> extends ErrorOptions, RenderOptions, ContextOptions, BehaviourOptions
{
    query?: Nullable<T>;
}

/**
 * @inheritDoc
 */
export interface PnpHookOptions<T = Nullable<ODataQueryableCollection | ODataQueryable>> extends ErrorOptions, RenderOptions, Partial<ContextOptions>, BehaviourOptions
{
    query?: Nullable<T>;
}

/**
 * @inheritDoc
 */
export interface PnpHookGlobalOptions extends ErrorOptions, RenderOptions, ContextOptions
{
    /**
     * Disable all hook calls in child components.
     * 
     * @example
     * Example values
     * ```
     * true       // disable all hooks
     * false      // enable all hooks
     * undefined  // enable all hooks
     * "auto"     // disable hooks by checking required parameters
     * ```
     */
    disabled?: boolean | "auto";
}

export { ErrorMode, ErrorOptions } from "./ExceptionOptions";
export { ListOptions } from "./ListOptions";
export { RenderOptions } from "./RenderOptions";
export { ContextOptions } from "./WebOptions";