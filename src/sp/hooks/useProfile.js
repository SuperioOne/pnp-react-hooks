import "@pnp/sp/profiles";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns an user profile for specified login name.
 *
 * @template T
 * @param {string} loginName - User login name. Changing the value resends request.
 * @param {import("./options").ProfileOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] useProfile refreshes response data when one of the dependencies changes.
 * @returns {T | null |undefined}
 */
export function useProfile(loginName, options, deps) {
  const globalOptions = useContext(InternalContext);

  /** @type{[T | null | undefined, import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>]} **/
  const [userProfile, setUserProfile] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      /** @type {(this:import("@pnp/sp/profiles").IProfiles) => Promise<T>}**/
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
