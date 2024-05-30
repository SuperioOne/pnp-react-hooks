/**
 * @param {Readonly<import('./types.private').SharepointQueryable>} instance
 * @returns {instance is import('@pnp/sp')._SPCollection}
 */
export function isQueryableCollection(instance) {
  /** @type{Readonly<import('@pnp/sp')._SPCollection>} **/
  // @ts-ignore
  const queryableCollection = instance;

  return (
    typeof queryableCollection.skip === "function" &&
    typeof queryableCollection.orderBy === "function" &&
    typeof queryableCollection.top === "function"
  );
}

/**
 * @param {import('./types.private').SharepointQueryable} instance
 * @returns {instance is {filter: (arg0:string) => unknown;}}
 */
export function isFilterable(instance) {
  return typeof Reflect.get(instance, "filter") === "function";
}

/**
 * @template {import('./types.private').SharepointQueryable} T
 * @param {T} instance
 * @param {null | undefined | import('./types').ODataQueryableCollection } query
 * @returns {T}
 */
export function insertODataQuery(instance, query) {
  if (!query) {
    return instance;
  }

  if (isQueryableCollection(instance)) {
    if (query.skip) {
      instance.skip(query.skip);
    }

    if (query.orderBy) {
      instance.orderBy(query.orderBy, query.orderyByAscending);
    }

    if (query.top) {
      instance.top(query.top);
    }
  }

  if (isFilterable(instance) && query.filter) {
    instance.filter(query.filter);
  }

  if (query.expand && query.expand.length > 0) {
    instance.expand(...query.expand);
  }

  if (query.select && query.select.length > 0) {
    instance.select(...query.select);
  }

  return instance;
}

