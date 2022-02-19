import { BehaviourOptions } from "../../types/options/BehaviourOptions";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { ErrorOptions, ContextOptions } from "../../types/options";
import { IChangeTokenInfo, ChangeTokenInfo } from "../../types/ChangeTokenInfo";
import { IList } from "@pnp/sp/lists/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { shallowEqual } from "../../utils/shallowEqual";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ListTokenOptions extends ErrorOptions, ContextOptions, BehaviourOptions
{
    disabled?: DisableOptionValueType | { (list: string): boolean };
}

/**
 * Returns list current change token and last modified dates.
 * @param list List GUID id or title. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useListChangeToken will resend request when one of the dependencies changed.
 */
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

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const spList = resolveList(sp.web, list)
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
        const opt = mergeOptions<undefined>(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, list);

        return opt;
    }, [list, options, globalOptions]);

    useQueryEffect(invokableFactory, _setTokenProxy, _options, _mergedDeps);

    return token;
}