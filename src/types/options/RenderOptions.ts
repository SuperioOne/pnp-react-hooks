/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RenderOptions
{
    loadActionOption?: LoadActionOption;
    disabled?: DisableOptionValueType | DisableOptionFuncType;
}

export type DisableOptionValueType = boolean | "auto";
export type DisableOptionFuncType = (...args: any[]) => boolean;
export type DisableOptionType = DisableOptionValueType | DisableOptionFuncType;

export enum LoadActionOption
{
    /**
     * Clear return value until new return value available.
     */
    ClearPrevious = 0,

    /**
     * Keep previous value and deferr re-render when render triggered.
     */
    KeepPrevious = 1
}
