import "@pnp/sp/profiles";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../overrideAction.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns an user profile for specified login name.
 *
 * @template T
 * @param {string} loginName - User login name. Changing the value resends request.
 * @param {import("./options.js").ProfileOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] useProfile refreshes response data when one of the dependencies changes.
 * @returns {T | null |undefined}
 */
export function useProfile(loginName, options, deps) {
  const globalOptions = useContext(InternalContext);

  /** @type{[
   *    T | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>
   *  ]}
   **/
  const [userProfile, setUserProfile] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
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
