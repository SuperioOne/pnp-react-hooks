import "@pnp/sp/site-users";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveUser } from "../resolveUser.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {UserOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteUserInfo} from "@pnp/sp/site-users" **/

/**
 * Returns an user from site user collection.
 *
 * @param {number | string} userId - User Id, login name, email. Value is automatically tracked for changes.
 * @param {UserOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteUserInfo | undefined | null}
 */
export function useUser(userId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteUserInfo | null | undefined, Dispatch<SetStateAction<ISiteUserInfo | null |undefined>> ]} **/
  const [siteUser, setSiteUser] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI}**/ sp) => resolveUser(sp.web.siteUsers, userId),
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
