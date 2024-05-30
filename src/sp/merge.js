/**
 * @param {Readonly<unknown[]>} deps
 * @param {...(Readonly<unknown[]> | undefined)} additionalDeps
 */
export function mergeDependencies(deps, ...additionalDeps) {
  return deps.concat(...additionalDeps.filter((e) => e !== undefined));
}

/**
 * @template TQuery
 * @param {import('../types/options').PnpHookGlobalOptions} globalOptions
 * @param {import('../types/options').PnpHookOptions<TQuery> | undefined} options
 * @returns {import('../types/options')._PnpHookOptions<TQuery>}
 */
export function mergeOptions(globalOptions, options) {
  return options ? { ...globalOptions, ...options } : { ...globalOptions };
}

