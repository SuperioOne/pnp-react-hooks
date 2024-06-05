import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/**
 * Returns web or list change collection. Use {@link ChangesOptions.list} property
 * to get list changes instead of web changes.
 *
 * @template T
 * @param {import("@pnp/sp/types.js").IChangeQuery} changeQuery - Change query.
 * @param {import("./options.js").ChangesOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useChanges refreshes response data when one of the dependencies changes.
 * @returns {T[] | undefined | null} Changes info array.
 *
 * @example
 * ```javascript
 * // make sure to add relevant query parameters to dependency array.
 *
 * const changes = useChanges({
 *     Add:true
 *     Alert:true,
 *     ChangeTokenEnd: { StringValue: tokenEnd },
 *     ChangeTokenStart: { StringValue: tokenStart}
 * }, [tokenStart, tokenEnd]);
 * ```
 */
export function useChanges(changeQuery, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    T[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<T[] | null |undefined>>
   *  ]}
   **/
  const [changes, setChanges] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      const scope = resolveScope(sp.web, options?.list, undefined);
      /** @type{(this: import("@pnp/sp/lists").IList | import("@pnp/sp/webs").IWeb) => Promise<T>} **/
      const action = function () {
        return this.getChanges(changeQuery);
      };

      return overrideAction(scope, action);
    },
    [options?.list, changeQuery],
  );

  const mergedDeps = mergeDependencies([options?.list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, changeQuery);

    return opt;
  }, [changeQuery, globalOptions, options]);

  useQueryEffect(requestFactory, setChanges, internalOpts, mergedDeps);

  return changes;
}
