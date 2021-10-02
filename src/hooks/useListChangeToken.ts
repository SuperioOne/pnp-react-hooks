import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ChangeTokenInfo, ExceptionOptions, Nullable, WebOptions } from "../types";
import { createInvokable, mergeDependencies, resolveList, shallowEqual } from "../utils";
import { useState, useCallback } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";

export interface ListTokenOptions extends WebOptions, ExceptionOptions
{
    disabled?: boolean;
}

export function useListChangeToken(
    list: string,
    options?: ListTokenOptions,
    deps?: React.DependencyList): Nullable<ChangeTokenInfo>
{
    const [token, setToken] = useState<Nullable<ChangeTokenInfo>>();

    const _setTokenProxy = useCallback((newToken: Nullable<ChangeTokenInfo>) =>
    {
        if (!shallowEqual(newToken, token))
        {
            setToken(newToken);
        }
    }, [token]);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const spList = resolveList(web, list)
            .select(
                "CurrentChangeToken",
                "ID",
                "LastItemDeletedDate",
                "LastItemModifiedDate",
                "LastItemUserModifiedDate");

        const action = async function (this: IList): Promise<ChangeTokenInfo>
        {
            const listInfo = await this();

            return {
                CurrentChangeToken: listInfo.CurrentChangeToken,
                Id: listInfo.Id,
                LastItemDeletedDate: listInfo.LastItemDeletedDate,
                LastItemModifiedDate: listInfo.LastItemModifiedDate,
                LastItemUserModifiedDate: listInfo.LastItemUserModifiedDate,
            };
        };

        return createInvokable(spList, action);
    }, [list]);

    const _mergedDeps = mergeDependencies([list], deps);

    useRequestEffect(invokableFactory, _setTokenProxy, options, _mergedDeps);

    return token;
}