import { ExceptionOptions } from "../types/options";

export function errorHandler(err: Error, options: ExceptionOptions)
{
    if (typeof options.exception === "function")
    {
        options.exception(err);
    }
    else if (!options.exception)
    {
        throw err;
    }
}