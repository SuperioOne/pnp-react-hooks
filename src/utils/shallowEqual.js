/**
 * Pollyfill function for Object.is()
 * @param {any} x
 * @param {any} y
 * @returns {boolean}
 */
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export const objectIs = Object.is ? Object.is : is;
export const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param {unknown | undefined | null} [objA]
 * @param {unknown | undefined | null} [objB]
 * @returns {boolean}
 */

export function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !objectIs(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
