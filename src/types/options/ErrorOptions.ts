export interface ErrorOptions
{
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

export enum ErrorMode
{
    /**
     * Throws error to upper level without any handling
     */
    Default = 0,

    /**
     * Do not emit any error
     */
    Suppress = 1
}