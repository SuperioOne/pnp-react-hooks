/**
 * @param {Readonly<unknown[]>} deps
 * @param {...(Readonly<unknown[]> | undefined)} additionalDeps
 */
export function mergeDependencies(deps, ...additionalDeps) {
  return additionalDeps.length > 0
    ? deps.concat(...additionalDeps.filter((e) => !!e))
    : deps;
}

/**
 * @template TQuery
 * @param {import('../types.js').PnpHookGlobalOptions} globalOptions
 * @param {import('./types.js').PnpHookOptions<TQuery> | undefined} options
 * @returns {import('./types.private.js').InternalPnpHookOptions<TQuery>}
 */
export function mergeOptions(globalOptions, options) {
  return options ? { ...globalOptions, ...options } : { ...globalOptions };
}
