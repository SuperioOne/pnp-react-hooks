import "@pnp/sp/site-users";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/**
 *@param {import('@pnp/sp').SPFI} sp
 */
function siteUsersRequest(sp) {
  return sp.web.siteUsers;
}

/**
 * Returns site users.
 *
 * @param {import("./options.js").SiteUsersOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSiteUsers refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/site-users").ISiteUserInfo[] | null | undefined}
 */
export function useSiteUsers(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/site-users").ISiteUserInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/site-users").ISiteUserInfo[] | null |undefined>>
   *  ]}
   **/
  const [siteUser, setSiteUser] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(siteUsersRequest, setSiteUser, internalOpts, deps);

  return siteUser;
}
