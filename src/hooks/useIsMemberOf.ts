import "@pnp/sp/site-groups";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable, resolveUser } from "../utils";
import { useState, useCallback } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";

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

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, MemberInfo> = async function ()
        {
            const user: ISiteUser = options?.userId
                ? resolveUser(this.siteUsers, options.userId)
                : this.currentUser;

            const queryInstance = typeof groupId === "number"
                ? user.groups.filter(`Id eq ${groupId}`)
                : user.groups.filter(`Title eq '${groupId}'`);

            const response = await queryInstance.top(1).get();

            return response.length === 1
                ? [true, response[0]]
                : [false, undefined];
        };

        return createInvokable(web, action);

    }, [options?.userId, groupId]);

    const _mergedDeps = deps
        ? [groupId, options?.userId].concat(deps)
        : [groupId, options?.userId];

    useRequestEffect(invokableFactory, setIsMember, options, _mergedDeps);

    return isMember ?? DEFAULT;
}