import { ErrorOptions } from "./ExceptionOptions";
import { Nullable } from "../utilityTypes";
import { RenderOptions } from "./RenderOptions";
import { ContextOptions } from "./ContextOptions";
import { BehaviourOptions } from "./BehaviourOptions";
import { ODataQueryable, ODataQueryableCollection } from "../ODataQueryable";
import { SPFI } from "@pnp/sp";

/**
 * Composition of all options for internal usages.
 * @internal
 */
export interface _PnpHookOptions<T = Nullable<ODataQueryableCollection | ODataQueryable>> extends ErrorOptions, RenderOptions, ContextOptions, BehaviourOptions
{
    query?: Nullable<T>;
    sp: SPFI;
}

/**
 * @inheritDoc
 */
export interface PnpHookOptions<T = Nullable<ODataQueryableCollection | ODataQueryable>> extends ErrorOptions, RenderOptions, ContextOptions, BehaviourOptions
{
    query?: Nullable<T>;
}

/**
 * @inheritDoc
 */
export interface PnpHookGlobalOptions extends ErrorOptions, RenderOptions, Required<ContextOptions>
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
export { ContextOptions } from "./ContextOptions";