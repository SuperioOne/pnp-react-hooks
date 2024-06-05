/**
 * Basic disable check for hook parameters.
 * Any argument with undefined, null, emptry string or non-positive numbers are turns-off hook execution.
 * @param {...any} args
 * @returns {boolean}
 */
function defaultCheck(...args) {
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    const type = typeof element;
    const canDisable =
      element === undefined ||
      (type === "string" && element.length < 1) ||
      (type === "number" && element < 1) ||
      element === null;

    if (canDisable) {
      return true;
    }
  }

  return false;
}

/**
 * @param {import('../types.js').DisableOptionType} [disabled]
 * @param {...any} args
 * @returns {boolean}
 */
export function checkDisable(disabled, ...args) {
  if (disabled !== undefined) {
    if (typeof disabled === "boolean") {
      return disabled;
    } else if (disabled === "auto") {
      return args.length > 0 ? defaultCheck(...args) : false;
    } else {
      return disabled(...args);
    }
  } else {
    return false;
  }
}
