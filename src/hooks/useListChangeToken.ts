import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ChangeTokenInfo, ExceptionOptions, IChangeTokenInfo, Nullable, WebOptions } from "../types";
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
    deps?: React.DependencyList): Nullable<IChangeTokenInfo>
{
    const [token, setToken] = useState<Nullable<IChangeTokenInfo>>();

    const _setTokenProxy = useCallback((newToken: Nullable<IChangeTokenInfo>) =>
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

        const action = async function (this: IList): Promise<IChangeTokenInfo>
        {
            const listInfo = await this();

            return new ChangeTokenInfo(listInfo);
        };

        return createInvokable(spList, action);
    }, [list]);

    const _mergedDeps = mergeDependencies([list], deps);

    useRequestEffect(invokableFactory, _setTokenProxy, options, _mergedDeps);

    return token;
}