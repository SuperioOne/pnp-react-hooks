import "@pnp/sp/recycle-bin";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export type RecycleBinItemsOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns all recycle bin items.
 * @param options Pnp hook options.
 * @param deps useRecycleBinItems will resend request when one of the dependencies changed.
 */
export function useRecycleBinItems(options?: RecycleBinItemsOptions, deps?: React.DependencyList): Nullable<IRecycleBinItemObject[]>
{
    const globalOptions = useContext(InternalContext);
    const [binItems, setBinItems] = useState<Nullable<IRecycleBinItemObject[]>>(undefined);

    const invokableFactory = useCallback(async (sp: SPFI) => createInvokable(sp.web.recycleBin), []);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);
        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setBinItems, _options, deps);

    return binItems;
}
