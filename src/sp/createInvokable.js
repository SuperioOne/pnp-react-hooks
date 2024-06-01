// import { PnpActionFunction } from "../types/PnpActionFunction";
// import { SharepointQueryable } from "../types/SharepointQueryable";

/**
 * Overrides functions default behavior with custom function.
 *
 * @template TResult
 * @template {import("./types.private").SharepointQueryable} [TContext=import("./types.private").SharepointQueryable]
 * @param {TContext} instance
 * @param {import("./types.private").PnpActionFunction<TContext, TResult>} func
 * @returns {TContext}
 */
export function overrideAction(instance, func) {
  return new Proxy(instance, {
    apply: function (context, thisArg, argsArray) {
      return Reflect.apply(func, context, argsArray);
    },
  });
}
