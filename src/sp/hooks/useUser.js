import "@pnp/sp/site-users";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveUser } from "../resolveUser.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";

/**
 * Returns an user from site user collection.
 *
 * @param {number | string} userId - User Id, login name, email.
 * @param {import("./options.js").UserOptions} [options]
 * @param {import("react").DependencyList} [deps]
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo | undefined | null}
 */
export function useUser(userId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/site-users").ISiteUserInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo | null |undefined>>
   *  ]}
   **/
  const [siteUser, setSiteUser] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI}**/ sp) =>
      resolveUser(sp.web.siteUsers, userId),
    [userId],
  );

  const mergedDeps = mergeDependencies([userId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, userId);

    return opt;
  }, [userId, options, globalOptions]);

  useQueryEffect(requestFactory, setSiteUser, internalOpts, mergedDeps);

  return siteUser;
}
