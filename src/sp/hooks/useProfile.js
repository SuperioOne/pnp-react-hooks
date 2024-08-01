import "@pnp/sp/profiles";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ProfileOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IProfiles} from "@pnp/sp/profiles" **/

/**
 * Returns an user profile for specified login name.
 *
 * @template T
 * @param {string} loginName - User login name. Value is automatically tracked for changes.
 * @param {ProfileOptions} [options] - Hook options.
 * @param {DependencyList} [deps] Custom dependency list.
 * @returns {T | null |undefined}
 */
export function useProfile(loginName, options, deps) {
  const globalOptions = useContext(InternalContext);

  /** @type{[ T | null | undefined, Dispatch<SetStateAction<T | null |undefined>> ]} **/
  const [userProfile, setUserProfile] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      /** @type {(this:IProfiles) => Promise<T>}**/
      const action = function () {
        return this.getPropertiesFor(loginName);
      };

      return overrideAction(sp.profiles, action);
    },
    [loginName],
  );

  const mergedDeps = mergeDependencies([loginName], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, loginName);

    return opt;
  }, [loginName, options, globalOptions]);

  useQueryEffect(requestFactory, setUserProfile, internalOpts, mergedDeps);

  return userProfile;
}
