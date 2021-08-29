export interface RenderOptions
{
    loadActionOption?: LoadActionOption;
}

export enum LoadActionOption
{
    /**
     * Apply default policy. Clear previous, re-render even same value.
     */
    ClearPrevious = 0,

    /**
     * When reload triggered keep previous value and deferr re-render.
     */
    KeepPrevious = 1
}
