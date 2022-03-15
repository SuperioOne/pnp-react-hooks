export const DEFAULT: Required<RetryOptions> = {
    waitTime: 200,
    retry: 3
};

export interface RetryOptions
{
    /**
     * Maximum retry count for failing requests. Default is 3.
     * @remarks Set the value less than 1 for disable retry.
     */
    retry?: number;

    /**
     * Wait time in ms for next retry call. Default is 200ms.
     */
    waitTime?: number;
}

export interface FetchInit
{
    request?: RequestInit;
    waitTime?: number;
    retry?: number;
}

/** HTTP error codes for retry */
export const HTTP_ERROR_CODES = [408, 429, 503, 504];