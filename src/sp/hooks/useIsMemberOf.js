import "@pnp/sp/site-groups";
import "@pnp/sp/site-users";
import {
  BehaviourOptions,
  ContextOptions,
  ErrorOptions,
  RenderOptions,
} from "../../types";
import { DisableOptionValueType } from "../../types";
import { ISiteGroupInfo, ISiteGroups } from "@pnp/sp/site-groups/types";
import { ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { assertID, assertString } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveUser } from "../resolveUser";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface IsMemberOfOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  /**
   * User email, login name or Id. Default is current user.
   * Changing userId resends request.
   */
  userId?: string | number;

  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

type MemberInfo = [
  boolean | null | undefined,
  ISiteGroupInfo | null | undefined,
];

const DEFAULT: MemberInfo = [undefined, undefined];

/**
 * Returns true, if user is member of group. If not returns false.
 * Use {@link IsMemberOfOptions.userId} property for another user. Default is current user.
 * @param groupId Group name or Id. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useIsMemberOf refreshes response data when one of the dependencies changes.
 */
export function useIsMemberOf(
  groupId: string | number,
  options?: IsMemberOfOptions,
  deps?: React.DependencyList,
): MemberInfo {
  const globalOptions = useContext(InternalContext);
  const [isMember, setIsMember] = useState<MemberInfo | null | undefined>(
    DEFAULT,
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const action = async function (this: IWeb): Promise<MemberInfo> {
        const user: ISiteUser = options?.userId
          ? resolveUser(this.siteUsers, options.userId)
          : this.currentUser;

        let groups: ISiteGroups;

        switch (typeof groupId) {
          case "number": {
            assertID(groupId, "groupId is not a valid Id.");
            groups = user.groups.filter(`Id eq ${groupId}`);
            break;
          }
          case "string": {
            assertString(groupId, "groupName is not a valid name string.");
            groups = user.groups.filter(`Title eq '${groupId}'`);
            break;
          }
          default:
            throw new TypeError("groupId type is not valid.");
        }

        const response = await groups.top(1).select("Id")();

        return response.length === 1 ? [true, response[0]] : [false, undefined];
      };

      return overrideAction(sp.web, action);
    },
    [options?.userId, groupId],
  );

  const _mergedDeps = mergeDependencies([groupId, options?.userId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions<undefined>(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, groupId);

    return opt;
  }, [groupId, options, globalOptions]);

  useQueryEffect(invokableFactory, setIsMember, _options, _mergedDeps);

  return isMember ?? DEFAULT;
}
