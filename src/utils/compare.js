import { assert } from "../utils/assert";

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

const objectIs = Object.is ? Object.is : is;
const hasOwnProperty = Object.prototype.hasOwnProperty;

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

/**
 * @param {string} val
 * @returns {string}
 */
function deleteTrailingSlashes(val) {
  return val.lastIndexOf("/") === val.length - 1
    ? val.substring(0, val.length - 1)
    : val;
}

/**
 * Compares if both urls are equal regardless of trailing slashes '/'.
 * Note, this function does not validate URL syntax.
 * @param {string} left
 * @param {string} right
 * @returns {boolean}
 */
export function compareURL(left, right) {
  const l = encodeURI(deleteTrailingSlashes(left)).toLocaleLowerCase();
  const r = encodeURI(deleteTrailingSlashes(right)).toLocaleLowerCase();

  return r === l;
}

/**
 * Deep comparisons between two arrays.
 * @param {null | undefined | readonly unknown[]} left
 * @param {null | undefined | readonly unknown[]} right
 * @returns {boolean} true if contents are equal, otherwise false.
 *
 * @example
 * compareArray([1,2,3,4,5], [5,4,2,1,3]) // true
 * compareArray([1,2,3,4,5], [5,4,2,"1",3]) // false
 */
export function compareArray(left, right) {
  if (left === right) {
    return true;
  }

  if (!left || !right || left.length !== right.length) {
    return false;
  }

  const sortedLeft = left.slice().sort();
  const sortedRight = right.slice().sort();

  for (let index = 0; index < sortedLeft.length; index++) {
    if (Object.is(sortedLeft[index], sortedRight[index])) {
      continue;
    }

    return false;
  }

  return true;
}

/**
 * Deep comparisons between two tuples.
 * @param {null | undefined | readonly unknown[]} left
 * @param {null | undefined | readonly unknown[]} right
 * @returns {boolean} true if contents are equal, otherwise false.
 * @throws {import('../erro../../utils/assertError').AssertError} Throws when tuple lengths are not equal.
 * @example
 *
 * compareTuples([1,2,3,4,5], [5,4,2,1,3]) // false
 * compareTuples([1,2,3,4,5], [5,4,2,"1",3]) // false
 * compareTuples([1,2,3,4,5], [1,2,3,4,5]) // true
 */
export function compareTuples(left, right) {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  assert(left.length === right.length, "Tuple lengths are not equal.");

  for (let index = 0; index < left.length; index++) {
    if (Object.is(left[index], right[index])) {
      continue;
    }

    return false;
  }

  return true;
}
