import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ChangesOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IChangeQuery} from "@pnp/sp/types.js" **/
/** @import {IList} from "@pnp/sp/lists" **/
/** @import {IWeb} from "@pnp/sp/webs" **/

/**
 * Returns web or list change collection. Use `ChangesOptions.list` property
 * to get list changes instead of web changes.
 *
 * @template T
 * @param {IChangeQuery} changeQuery - Change query.
 * @param {ChangesOptions} [options] - Hook options
 * @param {DependencyList} [deps] - Custom dependency list.
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
  /** @type{[ T[] | null | undefined, Dispatch<SetStateAction<T[] | null |undefined>> ]} **/
  const [changes, setChanges] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const scope = resolveScope(sp.web, options?.list, undefined);
      /** @type{(this: IList | IWeb) => Promise<T>} **/
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
