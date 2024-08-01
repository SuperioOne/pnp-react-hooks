import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveList } from "../resolveList.js";
import { shallowEqual } from "../../utils/shallowEqual.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ListTokenOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IList} from "@pnp/sp/lists" **/

/**
 * @typedef ChangeTokenInfo
 * @property {string} currentChangeToken
 * @property {string} id
 * @property {string} lastItemDeletedDate
 * @property {string} lastItemModifiedDate
 * @property {string} lastItemUserModifiedDate
 **/

/**
 * Returns list current change token and last modified dates.
 *
 * @param {string} list - List GUID id or title. Value is automatically tracked for changes.
 * @param {ListTokenOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ChangeTokenInfo | null | undefined}
 */
export function useListChangeToken(list, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ChangeTokenInfo | null | undefined, Dispatch<SetStateAction<ChangeTokenInfo | null |undefined>> ]} **/
  const [token, setToken] = useState();

  // This func make sures token reference doesn't change if the new token properties are exactly same as the current one.
  // Benefit of doing this is, we can use it in another hooks to get "when list changes" functionality.
  const setTokenProxy = useCallback(
    (/** @type{ChangeTokenInfo | null | undefined} **/ newToken) => {
      setToken((value) => (shallowEqual(newToken, value) ? value : newToken));
    },
    [],
  );

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const spList = resolveList(sp.web, list).select(
        "CurrentChangeToken",
        "ID",
        "LastItemDeletedDate",
        "LastItemModifiedDate",
        "LastItemUserModifiedDate",
      );

      /** @type{(this:IList) => Promise<ChangeTokenInfo>} **/
      const action = async function () {
        const listInfo = await this();

        return {
          id: listInfo.Id,
          currentChangeToken: listInfo.CurrentChangeToken,
          lastItemDeletedDate: listInfo.LastItemDeletedDate,
          lastItemModifiedDate: listInfo.LastItemModifiedDate,
          lastItemUserModifiedDate: listInfo.LastItemUserModifiedDate,
        };
      };

      return overrideAction(spList, action);
    },
    [list],
  );

  const mergedDeps = mergeDependencies([list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, list);

    return opt;
  }, [list, options, globalOptions]);

  useQueryEffect(requestFactory, setTokenProxy, internalOpts, mergedDeps);

  return token;
}
