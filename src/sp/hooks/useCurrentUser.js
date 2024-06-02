import "@pnp/sp/site-users";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useContext, useMemo } from "react";

/** @param {SPFI} sp **/
function currentUserRequest(sp) {
  return sp.web.currentUser;
}

/**
 * Returns current user information.
 *
 * @param {import("./options").CurrentUserInfoOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useCurrentUser refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo | null | undefined}
 */
export function useCurrentUser(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/site-users").ISiteUserInfo | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo | null |undefined>>]} **/
  const [currentUser, setCurrentUser] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(currentUserRequest, setCurrentUser, internalOpts, deps);

  return currentUser;
}
