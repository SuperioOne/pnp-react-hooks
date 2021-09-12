import "@pnp/sp/site-groups";
import useQueryEffect from "./internal/useQuery";
import { ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions, CacheOptions } from "../types";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { ISiteUser } from "@pnp/sp/site-users/types";
import { IWeb } from "@pnp/sp/webs/types";
import { createInvokable } from "../utils";
import { useState, useCallback, useMemo } from "react";

export interface IsMemberOfOptions extends ExceptionOptions, RenderOptions, WebOptions
{
    userIdentifier?: string | number;
}

// This request should not be cached. We simply wrap options object and inject
// caching to always false in case of global config.
interface _IsMemberOfOptions extends IsMemberOfOptions, CacheOptions { }

type MemberInfo = [Nullable<boolean>, Nullable<ISiteGroupInfo>];

const DEFAULT: MemberInfo = [undefined, undefined];

export function useIsMemberOf(
    groupIdentifier: string | number,
    options?: IsMemberOfOptions,
    deps?: React.DependencyList): MemberInfo
{
    const [isMember, setIsMember] = useState<Nullable<MemberInfo>>(DEFAULT);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        const action: PnpActionFunction<IWeb, MemberInfo> = async function ()
        {
            let user: ISiteUser;

            switch (typeof options?.userIdentifier)
            {
                case "number":
                    user = web.siteUsers.getById(options.userIdentifier);
                    break;
                case "string":
                    user = web.siteUsers.getByEmail(options.userIdentifier);
                    break;
                default:
                    user = web.currentUser
                    break;
            }

            const queryInstance = typeof groupIdentifier === "number"
                ? user.groups.filter(`Id eq ${groupIdentifier}`)
                : user.groups.filter(`Title eq '${groupIdentifier}'`);

            const response = await queryInstance.top(1).get();

            return response.length === 1
                ? [true, response[0]]
                : [false, undefined];
        }

        return createInvokable(web, action);

    }, [options?.userIdentifier, groupIdentifier]);

    // Enforce cache option to disabled
    const internalOptions: _IsMemberOfOptions = useMemo(() => ({ ...options, useCache: false }), [options]);

    const mergedDeps = deps
        ? [groupIdentifier, options?.userIdentifier].concat(deps)
        : [groupIdentifier, options?.userIdentifier];

    useQueryEffect(invokableFactory, setIsMember, internalOptions, mergedDeps);

    return isMember ?? DEFAULT;
}