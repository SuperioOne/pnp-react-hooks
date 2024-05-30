/**
 * @param {import('../types/options/RenderOptions').DisableOptionType} [disabled]
 * @param {import('../types/options/RenderOptions').DisableOptionFuncType} [defaultAction]
 * @param {...any} args
 * @returns {boolean}
 */
export function checkDisable(disabled, defaultAction, ...args) {
  if (disabled !== undefined) {
    if (typeof disabled === "boolean") {
      return disabled;
    } else if (disabled === "auto") {
      return defaultAction?.(...args) ?? false;
    } else {
      return disabled(...args);
    }
  } else {
    return false;
  }
}

/**
 * @param {...any} args
 * @returns {boolean}
 */
export function defaultCheckDisable(...args) {
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    const type = typeof element;

    const canDisable =
      element === undefined ||
      (type === "string" && element.length < 1) ||
      (type === "number" && element < 1) ||
      element === null;

    if (canDisable) return true;
  }

  return false;
}
