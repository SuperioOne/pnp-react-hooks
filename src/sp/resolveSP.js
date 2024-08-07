import { assert } from "../utils/assert.js";
import { spfi, SPFI } from "@pnp/sp";

/**
 * Resolves SP from configuration.
 * @param {import('./types.private.js').InternalPnpHookOptions<unknown>} options
 * @param {import('@pnp/core').TimelinePipe[]} [behaviors]
 * @throws {import('../errors/AssertError').AssertError} Throws when option.sp type is not instance of SPFI.
 * @returns {SPFI} - SP instance.
 */
export function resolveSP(options, behaviors) {
  assert(options.sp instanceof SPFI, "SP context is not valid");

  /** @type{import('@pnp/core').TimelinePipe[]} **/
  let newBehaviors = [];

  // user provided behaviors
  if (options.behaviors && options.behaviors.length > 0) {
    newBehaviors = options.behaviors;
  }

  // internal behaviors
  if (behaviors && behaviors.length > 0) {
    newBehaviors = newBehaviors.concat(behaviors);
  }

  return newBehaviors.length > 0
    ? spfi(options.sp).using(...newBehaviors)
    : options.sp;
}
