import "@pnp/sp/recycle-bin";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { RecycleBinScopes } from "../../types/literalTypes";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { isUUID } from "../../utils/isUUID";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export interface RecycleBinItemOptions extends PnpHookOptions<ODataQueryable>
{
    scope?: RecycleBinScopes;
    disabled?: DisableOptionValueType | { (itemId: string): boolean; };
}

/**
 * Returns an item from recycle bin.
 * @param itemId RecycleBin item guid ID. Changing the value resends request.
 * @param options Pnp hook options.
 * @param deps useRecycleBinItem refreshes response data when one of the dependencies changes.
 */
export function useRecycleBinItem(itemId: string, options?: RecycleBinItemOptions, deps?: React.DependencyList): Nullable<IRecycleBinItemObject>
{
    const [binItem, setBinItem] = useState<Nullable<IRecycleBinItemObject>>();
    const globalOptions = useContext(InternalContext);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, itemId);
        return opt;
    }, [options, globalOptions, itemId]);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        if (!isUUID(itemId))
            throw new TypeError("itemId is not a valid GUID string.");

        switch (options?.scope)
        {
            case "site":
                return createInvokable(sp.site.recycleBin.getById(itemId));
            case "web":
            default:
                return createInvokable(sp.web.recycleBin.getById(itemId));
        }
    }, [itemId, options?.scope]);

    const _mergedDeps = mergeDependencies([itemId, options?.scope], deps);

    useQueryEffect(invokableFactory, setBinItem, _options, _mergedDeps);

    return binItem;
}
