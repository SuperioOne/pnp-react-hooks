import { SharepointQueryable } from "../types";
import { PnpActionFunction } from "../types";

export function createInvokable<TResult, TContext extends SharepointQueryable = SharepointQueryable>(instance: TContext, func?: PnpActionFunction<TContext, TResult>): TContext
{
    if (func)
    {
        return new Proxy(instance,
            {
                apply: function (context, thisArg, argsArray)
                {
                    return Reflect.apply(func, context, argsArray);
                }
            });
    }
    else
    {
        return instance;
    }
}