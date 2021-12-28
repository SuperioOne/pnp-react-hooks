import * as React from "react";
import { TimeoutError } from "./TimeoutError";

const DEFAULT_TIMEOUT = 1000 * 60 * 2;

export function useTimeout(error: (err: Error) => void, timeout?: number)
{
    React.useEffect(() =>
    {
        if (timeout !== undefined && timeout < 1)
            return;

        const ctOut = timeout ?? DEFAULT_TIMEOUT;

        const timer = setTimeout(() => error(new TimeoutError(`useCurrentUser timed out. ${ctOut}`)),
            ctOut);

        return () => clearTimeout(timer);
    }, [timeout, error]);
}
