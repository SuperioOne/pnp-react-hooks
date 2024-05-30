import { PnpActionFunction } from "../types/PnpActionFunction";
import { SharepointQueryable } from "../types/SharepointQueryable";

export function createInvokable<
  TResult,
  TContext extends SharepointQueryable = SharepointQueryable,
>(instance: any, func?: any): TContext {
  if (func) {
    return new Proxy(instance, {
      apply: function (context, thisArg, argsArray) {
        return Reflect.apply(func, context, argsArray);
      },
    });
  } else {
    return instance;
  }
}
