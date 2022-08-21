import "@pnp/sp/recycle-bin";
import { IRecycleBinItemObject } from "@pnp/sp/recycle-bin/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { isUUID } from "../../utils/isUUID";
import { mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

export type RecycleBinItemOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns an item from recycle bin.
 * @param itemId
 * @param options Pnp hook options.
 * @param deps useRecycleBinItem will resend request when one of the dependencies changed.
 */
export function useRecycleBinItem(itemId: string, options?: RecycleBinItemOptions, deps?: React.DependencyList): Nullable<IRecycleBinItemObject>
{
    const [binItem, setBinItem] = useState<Nullable<IRecycleBinItemObject>>();
    const globalOptions = useContext(InternalContext);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);
        return opt;
    }, [options, globalOptions]);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        if (!isUUID(itemId))
            throw new TypeError("itemId is not a valid GUID string.");

        return createInvokable(sp.web.recycleBin.getById(itemId));
    }, [itemId]);

    useQueryEffect(invokableFactory, setBinItem, _options, deps);

    return binItem;
}
