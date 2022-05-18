import "@pnp/sp/views";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IViewInfo } from "@pnp/sp/views/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ViewsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (listId: string): boolean; };
}

/**
 * Returns list view collection.
 * @param listId List GUID id or title. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useViews will resend request when one of the dependencies changed.
 */
export function useViews(
    listId: string,
    options?: ViewsOptions,
    deps?: React.DependencyList): Nullable<IViewInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [view, setView] = useState<Nullable<IViewInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const spList = resolveList(sp.web, listId);
        return createInvokable(spList.views);
    }, [listId]);

    const _mergedDeps = mergeDependencies([listId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, listId);

        return opt;
    }, [listId, globalOptions, options]);

    useQueryEffect(invokableFactory, setView, _options, _mergedDeps);

    return view;
}