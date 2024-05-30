import { compareArray, shallowEqual } from "../uti../../utils/compare";

/**
 * Deeply compares options.
 * @param {import('../types/options')._PnpHookOptions | undefined | null} left
 * @param {import('../types/options')._PnpHookOptions | undefined | null} right
 * @returns {boolean} Returns true if both options are equal, otherwise returns false.
 **/
export function deepCompareOptions(left, right) {
  return (
    left === right ||
    (deepCompareQuery(left?.query, right?.query) &&
      shallowEqual(left?.sp, right?.sp))
  );
}

/**
 * Deep compares same type of OData queryable objects.
 * @template {import('../types/ODataQueryable').ODataQueryableCollection | import('../types/ODataQueryable').ODataQueryable} T
 * @param {T | null | undefined} left
 * @param {T | null | undefined} right
 * @returns {boolean} Returns true if both Queryables are equal, otherwise returns false.
 */
export function deepCompareQuery(left, right) {
  return (
    left === right ||
    (!!left && !!right && deepCompareODataQueryable(left, right))
  );
}

/**
 * @typedef {import('../types/ODataQueryable').ODataQueryable & import('../types/ODataQueryable').ODataQueryableCollection} _ODataQuery
 */

/**
 * @param {_ODataQuery} left
 * @param {_ODataQuery} right
 * @returns {boolean} Returns true if both
 */
function deepCompareODataQueryable(left, right) {
  return (
    left.filter === right.filter &&
    left.top === right.top &&
    left.orderBy === right.orderBy &&
    left.orderyByAscending === right.orderyByAscending &&
    left.skip === right.skip &&
    compareArray(left.select, right.select) &&
    compareArray(left.expand, right.expand)
  );
}
