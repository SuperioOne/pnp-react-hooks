import "@pnp/sp/folders";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IFolderInfo, IFolders } from "@pnp/sp/folders/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveFolder } from "../../utils/resolveFolder";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FoldersOptions extends PnpHookOptions<ODataQueryableCollection>
{
    /**
     * Root folder GUID Id or server relative path.
     * Changing root folder resends request.
     */
    rootFolderId?: string;
    disabled?: DisableOptionValueType | { (): boolean };
}

/**
 * Returns folders from root. Use {@link FoldersOptions.rootFolderId} property to change root.
 * @param options PnP hook options.
 * @param deps useFolders refreshes response data when one of the dependencies changes.
 */
export function useFolders(
    options?: FoldersOptions,
    deps?: React.DependencyList): Nullable<IFolderInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [folders, setFolders] = useState<Nullable<IFolderInfo[]>>();

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        let queryInst: IFolders;

        if (options?.rootFolderId === undefined)
        {
            queryInst = sp.web.folders;
        }
        else
        {
            const rootFolder = resolveFolder(sp.web, options.rootFolderId);
            queryInst = rootFolder.folders;
        }

        return createInvokable(queryInst);
    }, [options?.rootFolderId]);

    const _mergedDeps = mergeDependencies([options?.rootFolderId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setFolders, _options, _mergedDeps);

    return folders;
}