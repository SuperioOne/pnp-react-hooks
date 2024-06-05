/**
 * Overrides functions default behavior with custom function.
 *
 * @template TResult
 * @template {import("./types.private.js").SharepointQueryable} [TContext=import("./types.private.js").SharepointQueryable]
 * @param {TContext} instance
 * @param {import("./types.private.js").PnpActionFunction<TContext, TResult>} func
 * @returns {import("./types.private.js").SharepointQueryable<TResult>}
 */
export function overrideAction(instance, func) {
  return new Proxy(instance, {
    apply: function (context, thisArg, argsArray) {
      return Reflect.apply(func, context, argsArray);
    },
  });
}
