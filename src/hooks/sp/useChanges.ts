import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IChangeQuery } from "@pnp/sp/types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { RenderOptions, ErrorOptions, ContextOptions, BehaviourOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveScope } from "../../utils/resolveScope";
import { shallowEqual } from "../../utils/shallowEqual";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export interface ChangesOptions extends RenderOptions, ContextOptions, ErrorOptions, BehaviourOptions
{
    /**
     * List GUID Id or title for getting list changes. Keep undefined for web changes.
     * Changing list value resends request.
     */
    list?: string;
    disabled?: DisableOptionValueType | { (changeQuery: IChangeQuery): boolean; };
}

/**
 * Returns web or list change collection. Use {@link ChangesOptions.list} property
 * to get list changes instead of web changes.
 * @param changeQuery Change query. Hook resends request if **shallow comparison** returns false.
 * @param options PnP hook options
 * @param deps useChanges will resend request when one of the dependencies changed.
 * @returns Changes info array.
 * @example
 * ```
 * // Be cautious when using ChangeTokenEnd and ChangeTokenStart. Its values
 * // wrapped in an object and can result infinite rendering loop due to shallow comparison.
 *
 * // make sure token references are not changing every render.
 * const myQuery = useMemo(() => {
 *     Add:true
 *     Alert:true,
 *     ChangeTokenEnd: { StringValue: "some end token" },
 *     ChangeTokenStart: { StringValue: "some start token"}
 * },[]);
 *
 * const changes = useChanges(myQuery);
 *
 * // It's safe to use directly when you only use boolean query values.
 * const changes = useChanges({
 *     Add:true
 *     Alert:true,
 *     GroupMembershipDelete:true
 * });
 * ```
 */
export function useChanges<T>(
    changeQuery: IChangeQuery,
    options?: ChangesOptions,
    deps?: React.DependencyList): Nullable<T[]>
{
    const globalOptions = useContext(InternalContext);
    const [changes, setChanges] = useState<Nullable<T[]>>();
    const _changeQuery = useRef<IChangeQuery>(changeQuery);

    if (!shallowEqual(changeQuery, _changeQuery.current))
    {
        _changeQuery.current = changeQuery;
    }

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const scope = resolveScope(sp.web, {
            list: options?.list
        });

        const action = function (this: IList | IWeb)
        {
            return this.getChanges(_changeQuery.current) as Promise<T>;
        };

        return createInvokable(scope, action);
    }, [options?.list]);

    const _mergedDeps = mergeDependencies([options?.list, _changeQuery.current], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions<undefined>(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, changeQuery);

        return opt;
    }, [changeQuery, globalOptions, options]);

    useQueryEffect(invokableFactory, setChanges, _options, _mergedDeps);

    return changes;
}