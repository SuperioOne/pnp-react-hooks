import { Queryable } from "@pnp/queryable";
import { TimelinePipe } from "@pnp/core";

export function Logger(): TimelinePipe<Queryable>
{
    return (instance: Queryable) =>
    {
        instance.on.log(function (message)
        {
            console.debug(message);
        });

        return instance;
    };
}
