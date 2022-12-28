import "@pnp/sp/recycle-bin";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { RecycleBinScopes } from "../../types/literalTypes";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export interface RecycleBinItemsOptions extends PnpHookOptions<ODataQueryableCollection>
{
    scope?: RecycleBinScopes;
}

/**
 * Returns all recycle bin items.
 * @param options Pnp hook options.
 * @param deps useRecycleBinItems refreshes response data when one of the dependencies changes.
 */
export function useRecycleBinItems(options?: RecycleBinItemsOptions, deps?: React.DependencyList): Nullable<IRecycleBinItemObject[]>
{
    const globalOptions = useContext(InternalContext);
    const [binItems, setBinItems] = useState<Nullable<IRecycleBinItemObject[]>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        switch (options?.scope)
        {
            case "site":
                return createInvokable(sp.site.recycleBin);
            case "web":
            default:
                return createInvokable(sp.web.recycleBin);
        }
    }, [options?.scope]);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);
        return opt;
    }, [options, globalOptions]);

    const _mergedDeps = mergeDependencies([options?.scope], deps);

    useQueryEffect(invokableFactory, setBinItems, _options, _mergedDeps);

    return binItems;
}
