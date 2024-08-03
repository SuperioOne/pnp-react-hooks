import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveGroup } from "../resolveGroup.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {GroupOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteGroupInfo} from "@pnp/sp/site-groups" **/

/**
 * Returns a group from group collection.
 *
 * @param {string | number} groupId - Group Id or name. Value is automatically tracked for changes.
 * @param {GroupOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteGroupInfo | null | undefined}
 */
export function useGroup(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteGroupInfo | null | undefined, Dispatch<SetStateAction<ISiteGroupInfo | null |undefined>> ]} **/
  const [group, setGroup] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => resolveGroup(sp.web, groupId),
    [groupId],
  );

  const mergedDeps = mergeDependencies([groupId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(requestFactory, setGroup, internalOpts, mergedDeps);

  return group;
}
