import "@pnp/sp/security";
import "@pnp/sp/site-users";
import {
  BehaviourOptions,
  ContextOptions,
  ErrorOptions,
  RenderOptions,
  DisableOptionValueType,
} from "../../types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { PermissionKind } from "@pnp/sp/security/types";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { isEmail, isNull } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useMemo, useContext } from "react";
import { Scope } from "../types";

export interface UserPermissionOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  /**
   * User email, login name or Id. Default is current user.
   * Changing userId resends request.
   */
  userId?: string | number;

  /**
   * List and list item scope configuration. Default is current web scope.
   */
  scope?: Scope;
  disabled?:
    | DisableOptionValueType
    | {
        (
          permissionKinds: PermissionKind[] | PermissionKind,
          userId: string | number,
        ): boolean;
      };
}

/**
 * Returns true if user has permission on scope. If not returns false.
 * Use {@link UserPermissionOptions.userId} for another user and {@link UserPermissionOptions.scope} for permission scope.
 * Default is current user permission on current web scope.
 * @param permissionKinds SP permission kind array or permission kind value. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useHasPermission refreshes response data when one of the dependencies changes.
 */
export function useHasPermission(
  permissionKinds: PermissionKind[] | PermissionKind,
  options?: UserPermissionOptions,
  deps?: React.DependencyList,
): boolean | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [hasPermission, setHasPermission] = useState<
    boolean | null | undefined
  >(undefined);

  const _permFlag: PermissionKind = useMemo(
    () =>
      typeof permissionKinds === "number"
        ? permissionKinds
        : permissionKinds.reduce((p, c) => p | c),
    [permissionKinds],
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      let userLoginName: string | undefined;
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
            ? (await sp.web.siteUsers.getByEmail(userId).select("LoginName")())
                .LoginName
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

      const action = async function (this: IWeb) {
        const basePerm = await (isNull(userLoginName)
          ? scope.getCurrentUserEffectivePermissions()
          : scope.getUserEffectivePermissions(userLoginName));

        return scope.hasPermissions(basePerm, _permFlag);
      };

      return overrideAction(sp.web, action);
    },
    [options, _permFlag],
  );

  const _mergedDeps = mergeDependencies(
    [options?.userId, _permFlag, options?.scope?.list, options?.scope?.item],
    deps,
  );

  const _options = useMemo(() => {
    const opt = mergeOptions<undefined>(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      permissionKinds,
    );

    return opt;
  }, [permissionKinds, options, globalOptions]);

  useQueryEffect(invokableFactory, setHasPermission, _options, _mergedDeps);

  return hasPermission;
}
