/**
 * @param {Error} err
 * @param {import('../types.js').ErrorOptions} options
 */
export function errorHandler(err, options) {
  if (typeof options.error === "function") {
    options.error(err);
  } else if (!options.error) {
    throw err;
  }
}
