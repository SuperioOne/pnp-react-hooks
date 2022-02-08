import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IChangeTokenInfo, ChangeTokenInfo } from "../types/ChangeTokenInfo";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { WebOptions, ExceptionOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveList } from "../utils/resolveList";
import { shallowEqual } from "../utils/shallowEqual";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ListTokenOptions extends WebOptions, ExceptionOptions
{
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

export function useListChangeToken(
    list: string,
    options?: ListTokenOptions,
    deps?: React.DependencyList): Nullable<IChangeTokenInfo>
{
    const globalOptions = useContext(InternalContext);
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

        return opt;
    }, [list, options, globalOptions]);

    useRequestEffect(invokableFactory, _setTokenProxy, _options, _mergedDeps);

    return token;
}