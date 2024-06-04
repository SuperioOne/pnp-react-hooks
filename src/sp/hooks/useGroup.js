import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveGroup } from "../resolveGroup";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns a group from group collection.
 *
 * @param {string | number} groupId - Group Id or name. Changing the value resends request.
 * @param {import("./options").GroupOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useGroup refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-groups").ISiteGroupInfo | null | undefined}
 */
export function useGroup(groupId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/site-groups").ISiteGroupInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-groups").ISiteGroupInfo | null |undefined>>
   *  ]}
   **/
  const [group, setGroup] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => resolveGroup(sp.web, groupId),
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
