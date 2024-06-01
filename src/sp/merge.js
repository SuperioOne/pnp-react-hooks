/**
 * @param {Readonly<unknown[]>} deps
 * @param {...(Readonly<unknown[]> | undefined)} additionalDeps
 */
export function mergeDependencies(deps, ...additionalDeps) {
  return deps.concat(...additionalDeps.filter((e) => e !== undefined));
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
