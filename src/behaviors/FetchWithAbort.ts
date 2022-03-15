/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { IQueryableInternal, Queryable } from "@pnp/queryable/queryable";
import { HttpRequestError } from "@pnp/queryable";
import { LogLevel } from "@pnp/logging";
import { RetryOptions, FetchInit, DEFAULT, HTTP_ERROR_CODES } from "./types";

export function FetchWithAbort(props?: RetryOptions)
{
    return (instance: Queryable) =>
    {
        instance.on.send.clear();

        instance.on.send(function (this: IQueryableInternal, url: URL, init: RequestInit)
        {
            this.log(`Fetch: ${init.method} ${url.toString()}`, LogLevel.Verbose);

            return _browserFetchRetry(url.toString(), {
                request: init,
                waitTime: props?.waitTime,
                retry: props?.retry
            });
        });

        return instance;
    };
}

/**
 * Calls native fetch with retry mechanism.
 * @remarks Fetch internal errors are not recoverable without changing request properties.
 * That's why there is no retry mechanism for fetch call.
 * See fetch errors {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch#exceptions}
 */
export async function _browserFetchRetry(input: RequestInfo, init?: FetchInit): Promise<Response>
{
    const retry = (init?.retry ?? DEFAULT.retry) - 1; // reducing retry count by 1.
    let wait = init?.waitTime ?? DEFAULT.waitTime;

    const response = await fetch(input, init?.request);

    // Response is not ok
    if (!response.ok)
    {
        // network or throttle error but we can still retry
        if (HTTP_ERROR_CODES.includes(response.status) && retry > 0)
        {
            if (response.headers.has("Retry-After"))
            {
                wait = parseInt(response.headers.get("Retry-After")!, 10) * 1000;
            }

            return new Promise((resolve, reject) =>
            {
                setTimeout(() =>
                {
                    _browserFetchRetry(input, {
                        request: init?.request,
                        retry: retry,
                        waitTime: init?.waitTime
                    })
                        .then(resolve)
                        .catch(reject);
                }, wait);
            });
        }
        else
        {
            // Retry count exceeded the limit, bad request, forbidden, server 500 etc.
            throw new HttpRequestError(
                `${input.toString()} failed with ${response.status}:${response.statusText}`,
                response);
        }
    }
    else
    {
        return response;
    }
}