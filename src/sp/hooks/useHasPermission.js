import "@pnp/sp/security";
import "@pnp/sp/site-users";
import { InternalContext } from "../../context/internalContext.js";
import { assertID, assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { overrideAction } from "../createInvokable.js";
import { isEmail } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useMemo, useContext } from "react";
import { PermissionKind } from "@pnp/sp/security";

/**
 * Returns true if user has permission on scope. If not returns false.
 * Use {@link UserPermissionOptions.userId} for another user and {@link UserPermissionOptions.scope} for permission scope.
 * Default is current user permission on current web scope.
 *
 * @param {PermissionKind[] | PermissionKind} permissionKinds - SP permission kind array or permission kind value. Changing the value resends request.
 * @param {import("./options.js").UserPermissionOptions} [options] - Pnp hook options.
 * @param {import("react").DependencyList} [deps] - useHasPermission refreshes response data when one of the dependencies changes.
 * @returns {boolean | null | undefined }
 */
export function useHasPermission(permissionKinds, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    boolean | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<boolean | null |undefined>>
   *  ]}
   **/
  const [hasPermission, setHasPermission] = useState();
  /** @type{PermissionKind} **/
  const permFlag = useMemo(
    () =>
      typeof permissionKinds === "number"
        ? permissionKinds
        : permissionKinds.reduce((p, c) => p | c),
    [permissionKinds],
  );

  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      /** @type{(this:import("@pnp/sp/webs").IWeb) => Promise<boolean>} **/
      const action = async function () {
        /** @type{string | undefined} **/
        let userLoginName;
        const userId = options?.userId;

        switch (typeof userId) {
          case "number": {
            assertID(userId, "userId is not valid ID.");
            userLoginName = (
              await sp.web.siteUsers.getById(userId).select("LoginName")()
            ).LoginName;
            break;
          }
          case "string": {
            assertString(userId, "userId is not valid or empty");
            userLoginName = isEmail(userId)
              ? (
                  await sp.web.siteUsers
                    .getByEmail(userId)
                    .select("LoginName")()
                ).LoginName
              : userId;

            break;
          }
          case "undefined": {
            userLoginName = undefined;
            break;
          }
          default:
            throw new TypeError("userId value type is not string or number.");
        }

        const scope = resolveScope(
          sp.web,
          options?.scope?.list,
          options?.scope?.item,
        );

        const basePerm = await (userLoginName === null ||
        userLoginName === undefined
          ? scope.getCurrentUserEffectivePermissions()
          : scope.getUserEffectivePermissions(userLoginName));

        return scope.hasPermissions(basePerm, permFlag);
      };

      return overrideAction(sp.web, action);
    },
    [options?.scope?.item, options?.scope?.list, options?.userId, permFlag],
  );

  const mergedDeps = mergeDependencies(
    [options?.userId, permFlag, options?.scope?.list, options?.scope?.item],
    deps,
  );

  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, permissionKinds);

    return opt;
  }, [permissionKinds, options, globalOptions]);

  useQueryEffect(requestFactory, setHasPermission, internalOpts, mergedDeps);

  return hasPermission;
}
