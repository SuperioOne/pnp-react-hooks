import "@pnp/sp/site-users";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {SiteUsersOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteUserInfo} from "@pnp/sp/site-users" **/

/**
 *@param {SPFI} sp
 */
function siteUsersRequest(sp) {
  return sp.web.siteUsers;
}

/**
 * Returns site users.
 *
 * @param {SiteUsersOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteUserInfo[] | null | undefined}
 */
export function useSiteUsers(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteUserInfo[] | null | undefined, Dispatch<SetStateAction<ISiteUserInfo[] | null |undefined>> ]} **/
  const [siteUser, setSiteUser] = useState();
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(siteUsersRequest, setSiteUser, internalOpts, deps);

  return siteUser;
}
