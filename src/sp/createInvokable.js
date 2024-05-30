// import { PnpActionFunction } from "../types/PnpActionFunction";
// import { SharepointQueryable } from "../types/SharepointQueryable";

/**
 * @template TResult
 * @template {import("./types.private").SharepointQueryable} [TContext=import("./types.private").SharepointQueryable]
 * @param {TContext} instance
 * @param {import("./types.private").PnpActionFunction<TContext, TResult>} [func]
 * @returns {TContext}
 */
export function createInvokable(instance, func) {
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
