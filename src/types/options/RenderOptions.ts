export interface RenderOptions
{
    loadActionOption?: LoadActionMode;
    disabled?: boolean;
}

export enum LoadActionMode
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
