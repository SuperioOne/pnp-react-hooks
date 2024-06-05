import type { SPFI } from "@pnp/sp";
import type { TimelinePipe } from "@pnp/core";

export type * from "./sp/hooks/options.js";
export type * from "./sp/types.js";

/**
 * @inheritDoc
 */
export interface PnpHookGlobalOptions
  extends ErrorOptions,
    RenderOptions,
    Required<ContextOptions> {
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

export interface ErrorOptions {
  /**
   * Error handling
   * @default {@link ErrorMode.Default}
   */
  error?: ErrorFunc | ErrorMode;
}

/**
 * Custom error handling callback.
 * @param err Error object
 */
export type ErrorFunc = (err: Error) => void;

export enum ErrorMode {
  /**
   * Throws error to upper level without any handling
   */
  Default = 0,

  /**
   * Do not emit any error
   */
  Suppress = 1,
}

export interface RenderOptions {
  /**
   * Keep previous state until new request is resolved rather than clearing the state as 'undefined'.
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

export interface ContextOptions {
  /**
   * Pnp SP context.
   *
   * @example
   * Example usage for SPFX webparts
   * ```
   * import { spfi, SPFx } from "@pnp/sp";
   *
   * spfi("your tenant url").using(SPFx(this.context))
   * ```
   * @remarks
   * for more details see {@link https://pnp.github.io/pnpjs/sp/behaviors/}
   */
  sp?: SPFI;
}

export type DisableOptionValueType = boolean | "auto";
export type DisableOptionFuncType = (...args: any[]) => boolean;
export type DisableOptionType = DisableOptionValueType | DisableOptionFuncType;

export interface BehaviourOptions {
  /**
   * Additional behaviors for hooks PnP request.
   * @remarks You can define built-in or custom behaviors for single hook.
   * for more details see PnPjs original docs {@link https://pnp.github.io/pnpjs/core/behaviors/}
   */
  behaviors?: TimelinePipe<any>[];
}
