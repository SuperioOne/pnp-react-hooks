import { TimelinePipe } from "@pnp/core";
import { _PnpHookOptions } from "../types/options";
import { _SPCollection, _SPQueryable } from "@pnp/sp";
import { insertODataQuery } from "../utils/insertODataQuery";

/**
 * Inserts OData queries based on query type
 * @internal
 */
export function InitPnpHookOptions<T extends _SPCollection | _SPQueryable>(options: _PnpHookOptions): TimelinePipe
{
    return (instance: T) =>
    {
        const customInstance = insertODataQuery(instance, options?.query);

        // insert user supplied behaviors
        if (options?.behaviors)
        {
            customInstance.using(...options.behaviors);
        }

        return customInstance;
    };
}