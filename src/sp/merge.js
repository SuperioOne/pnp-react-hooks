/**
 * @param {Readonly<unknown[]>} deps
 * @param {...(Readonly<unknown[]> | undefined)} additionalDeps
 */
export function mergeDependencies(deps, ...additionalDeps) {
  return additionalDeps.length > 0 ? deps.concat(...additionalDeps) : deps;
}

/**
 * @template TQuery
 * @param {import('../types').PnpHookGlobalOptions} globalOptions
 * @param {import('./types').PnpHookOptions<TQuery> | undefined} options
 * @returns {import('./types.private').InternalPnpHookOptions<TQuery>}
 */
export function mergeOptions(globalOptions, options) {
  return options ? { ...globalOptions, ...options } : { ...globalOptions };
}
