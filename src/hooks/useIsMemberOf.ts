import "@pnp/sp/site-groups";
import "@pnp/sp/site-users";
import { ExceptionOptions, RenderOptions, WebOptions } from "../types/options";
import { ISiteGroupInfo, ISiteGroups } from "@pnp/sp/site-groups/types";
import { ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { PnpActionFunction } from "../types/PnpActionFunction";
import { assertID, assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveUser } from "../utils/resolveUser";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback } from "react";

export interface IsMemberOfOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    userId?: string | number;
}

type MemberInfo = [Nullable<boolean>, Nullable<ISiteGroupInfo>];

const DEFAULT: MemberInfo = [undefined, undefined];

export function useIsMemberOf(
    groupId: string | number,
    options?: IsMemberOfOptions,
    deps?: React.DependencyList): MemberInfo
{
    const [isMember, setIsMember] = useState<Nullable<MemberInfo>>(DEFAULT);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, MemberInfo> = async function ()
        {
            const user: ISiteUser = options?.userId
                ? resolveUser(this.siteUsers, options.userId)
                : this.currentUser;

            let groups: ISiteGroups;

            switch (typeof groupId)
            {
                case "number":
                    {
                        assertID(groupId, "groupId is not a valid Id.");
                        groups = user.groups.filter(`Id eq ${groupId}`);
                        break;
                    }
                case "string":
                    {
                        assertString(groupId, "groupName is not a valid name string.");
                        groups = user.groups.filter(`Title eq '${groupId}'`);
                        break;
                    }
                default:
                    throw new TypeError("groupId type is not valid.");
            }

            const response = await groups.top(1).get();

            return response.length === 1
                ? [true, response[0]]
                : [false, undefined];
        };

        return createInvokable(web, action);

    }, [options?.userId, groupId]);

    const _mergedDeps = mergeDependencies([groupId, options?.userId], deps);

    useRequestEffect(invokableFactory, setIsMember, options, _mergedDeps);

    return isMember ?? DEFAULT;
}