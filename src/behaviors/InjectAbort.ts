import { IQueryableInternal, Queryable } from "@pnp/queryable/queryable";
import { ABORT_SUPPORT } from "./types";
import { LogLevel } from "@pnp/logging";

/**
 * Aborts fetch request and pnpjs timeline at any point.
 * @param abortController Abort controller {@link ManagedAbort}
 */
export function InjectAbort(abortController: ManagedAbort)
{
    return (instance: Queryable) =>
    {
        let isAbortSupported = true;

        for (const sendObserver of instance.on.send.toArray())
        {
            // Some fetch implementations may cause an infinite loop.
            if (!sendObserver[ABORT_SUPPORT])
            {
                isAbortSupported = false;
                break;
            }
        }

        if (isAbortSupported)
        {
            instance.on.pre.prepend(async function (this: IQueryableInternal, url: string, init: RequestInit, result: unknown)
            {
                if (abortController.signal.aborted)
                {
                    instance.log(`Fetch: ${init.method} ${url.toString()} request aborted at 'pre' timeline.`, LogLevel.Verbose);
                    throw new AbortError();
                }

                init.signal = abortController.signal;
                return [url, init, result];
            });

            instance.on.auth.prepend(async (url, init) =>
            {
                if (abortController.signal.aborted)
                {
                    instance.log(`Fetch: ${init.method} ${url.toString()} request aborted at 'auth' timeline.`, LogLevel.Verbose);
                    throw new AbortError();
                }

                return [url, init];
            });

            instance.on.data.prepend(async (response) =>
            {
                if (abortController.signal.aborted)
                {
                    instance.log(`Fetch: request aborted at 'data' timeline.`, LogLevel.Verbose);
                    throw new AbortError();
                }

                return [response];
            });

            instance.on.dispose.prepend(() =>
            {
                // Reset internal abortSignal just in case of executing same instance more than once.
                abortController.reset();
            });
        }

        return instance;
    };
}

/**
 * Basic version of AbortController but allows reset.
 */
export class ManagedAbort
{
    private _abortController: AbortController;

    constructor()
    {
        this._abortController = new AbortController();
    }

    public get signal(): Readonly<AbortSignal>
    {
        return this._abortController?.signal;
    }

    public abort()
    {
        this._abortController.abort();
    }

    public reset()
    {
        this._abortController = new AbortController();
    }
}

export class AbortError extends Error
{
    constructor()
    {
        super("Fetch aborted");
        this.name = "AbortError";
    }
}