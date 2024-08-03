import "@pnp/sp/site-groups";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { isEmail } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";
import { InternalContext } from "../../context/internalContext.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {GroupsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {ISiteGroupInfo} from "@pnp/sp/site-groups" **/

/**
 * Returns group collection. Use `GroupsOptions.userId` property to get
 * groups for specific user.
 *
 * @param {GroupsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {ISiteGroupInfo[] | null | undefined}
 */
export function useGroups(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ ISiteGroupInfo[] | null | undefined, Dispatch<SetStateAction<ISiteGroupInfo[] | null |undefined>> ]} **/
  const [groups, setGroups] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const userId = options?.userId;

      switch (typeof userId) {
        case "number": {
          assertID(userId, "userId is not valid ID.");
          return sp.web.siteUsers.getById(userId).groups;
        }
        case "string": {
          assertString(userId, "userId is not valid or empty");
          return isEmail(userId)
            ? sp.web.siteUsers.getByEmail(userId).groups
            : sp.web.siteUsers.getByLoginName(userId).groups;
        }
        case "undefined": {
          return sp.web.siteGroups;
        }
        default:
          throw new TypeError("userId value type is not string or number.");
      }
    },
    [options?.userId],
  );

  const mergedDeps = mergeDependencies([options?.userId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setGroups, internalOpts, mergedDeps);

  return groups;
}
