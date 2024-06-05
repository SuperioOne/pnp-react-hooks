import { AssertError } from "../errors/AssertError.js";

/**
 * @param {unknown} condition - Condition expression.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when conditions is evaluated as false.
 * @returns {asserts condition}
 */
export function assert(condition, message) {
  if (!condition) {
    throw new AssertError(message);
  }
}

/**
 * @param {string | null |undefined} str - Input string.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a string, empty or whitespace.
 * @returns {asserts str}
 */
export function assertString(str, message) {
  if (typeof str !== "string" || str.trim().length < 1) {
    throw new AssertError(message);
  }
}

/**
 * @param {number | null | undefined} num - Input number.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a number.
 * @returns {asserts num}
 */
export function assertNumber(num, message) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new AssertError(message);
  }
}

/**
 * @param {number | null | undefined} num - Input number.
 * @param {number } min - Minimum allowed number.
 * @param {number } max - Maximum allowed number.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a number or not in range.
 * @returns {asserts num}
 */
export function assertRange(num, min, max, message) {
  if (typeof num !== "number" || isNaN(num) || min > num || num > max) {
    throw new AssertError(message);
  }
}

/**
 * @param {number | null | undefined} num - Input number.
 * @param {number } min - Minimum allowed number.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a number or less than min.
 * @returns {asserts num}
 */
export function assertMin(num, min, message) {
  if (typeof num !== "number" || isNaN(num) || min > num) {
    throw new AssertError(message);
  }
}

/**
 * @param {number | null | undefined} id - Numeric identifier.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a number or less than 1.
 * @returns {asserts id}
 */
export function assertID(id, message) {
  assertMin(id, 1, message);
}

/**
 * @param {number | null | undefined} num - Input number.
 * @param {number} max - Maximum allowed number.
 * @param {string} [message] - Display message.
 * @throws {AssertError} Throws when value is not a number or greater than max.
 * @returns {asserts num}
 */
export function assertMax(num, max, message) {
  if (typeof num !== "number" || isNaN(num) || num > max) {
    throw new AssertError(message);
  }
}
