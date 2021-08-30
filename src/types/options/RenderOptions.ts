export interface RenderOptions
{
    loadActionOption?: LoadActionMode;
}

export enum LoadActionMode
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
