/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RenderOptions
{
    /**
     * Keep previous state until new request resolves rather than clearing the state as 'undefined'.
     * @remarks
     * By default hooks clear their current state when a new request started. 
     * Setting state to 'undefined' causes an extra rendering on the component but,
     * can be used for loading/shimmer/skeleton effects.
     * @default false
     */
    keepPreviousState?: boolean;

    /**
     * Disable hook calls and renders.
     * 
     * @example
     * Example values
     * ```
     * true       // disable all hooks
     * false      // enable all hooks
     * undefined  // enable all hooks
     * "auto"     // disable hooks by checking required parameters
     * (...param: any[]) => { return someValue === someOtherValue; }  // custom check function
     * ```
     */
    disabled?: DisableOptionValueType | DisableOptionFuncType;
}

export type DisableOptionValueType = boolean | "auto";
export type DisableOptionFuncType = (...args: any[]) => boolean;
export type DisableOptionType = DisableOptionValueType | DisableOptionFuncType;