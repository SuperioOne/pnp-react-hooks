import { ErrorOptions } from "../types/options";

export function errorHandler(err: Error, options: ErrorOptions)
{
    if (typeof options.error === "function")
    {
        options.error(err);
    }
    else if (!options.error)
    {
        throw err;
    }
}