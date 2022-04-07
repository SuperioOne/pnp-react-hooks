import "@pnp/sp/views";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IViewInfo } from "@pnp/sp/views/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { isUUID } from "../../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveList } from "../../utils/resolveList";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ViewOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (listId: string, viewId?: string): boolean; };
}

/**
 * Returns a list view.
 * @param listId List GUID id or title. Changing the value resends request.
 * @param viewId View title or view GUID id.
 * @param options PnP hook options.
 * @param deps useView will resend request when one of the dependencies changed.
 */
export function useView(
    listId: string,
    viewId?: string,
    options?: ViewOptions,
    deps?: React.DependencyList): Nullable<IViewInfo>
{
    const globalOptions = useContext(InternalContext);
    const [view, setView] = useState<Nullable<IViewInfo>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const spList = resolveList(sp.web, listId);

        switch (typeof viewId)
        {
            case "string":
                {
                    return isUUID(viewId)
                        ? createInvokable(spList.views.getById(viewId))
                        : createInvokable(spList.views.getByTitle(viewId));
                }
            case "undefined":
                return createInvokable(spList.defaultView);
            default:
                throw new TypeError("viewId value type is not string or undefined.");
        }
    }, [listId, viewId]);

    const _mergedDeps = mergeDependencies([listId, viewId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, listId, viewId);

        return opt;
    }, [listId, viewId, globalOptions, options]);

    useQueryEffect(invokableFactory, setView, _options, _mergedDeps);

    return view;
}