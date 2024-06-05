import "@pnp/sp/site-users";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @param {import('@pnp/sp').SPFI} sp **/
function currentUserRequest(sp) {
  return sp.web.currentUser;
}

/**
 * Returns current user information.
 *
 * @param {import("./options.js").CurrentUserInfoOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useCurrentUser refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo | null | undefined}
 */
export function useCurrentUser(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/site-users").ISiteUserInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo | null |undefined>>
   *  ]}
   **/
  const [currentUser, setCurrentUser] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(currentUserRequest, setCurrentUser, internalOpts, deps);

  return currentUser;
}
