import { useState, useCallback } from "react";
import { useRequestEffect } from "./internal/useRequestEffect";
import { shallowEqual } from "../utils/shallowEqual";
import { resolveList } from "../utils/resolveList";
import { mergeDependencies } from "../utils/mergeDependencies";
import { createInvokable } from "../utils/createInvokable";
import { WebOptions, ExceptionOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";
import { IWeb } from "@pnp/sp/webs/types";
import { IList } from "@pnp/sp/lists/types";
import { IChangeTokenInfo, ChangeTokenInfo } from "../types/ChangeTokenInfo";

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