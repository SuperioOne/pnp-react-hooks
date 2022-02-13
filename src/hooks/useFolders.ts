import "@pnp/sp/folders";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IFolderInfo, IFolders } from "@pnp/sp/folders/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { createInvokable } from "../utils/createInvokable";
import { mergeOptions } from "../utils/merge";
import { resolveFolder } from "../utils/resolveFolder";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FoldersOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (): boolean };
    folderId?: string;
}

export function useFolders(
    options?: FoldersOptions,
    deps?: React.DependencyList): Nullable<IFolderInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [folders, setFolders] = useState<Nullable<IFolderInfo[]>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        let queryInst: IFolders;

        if (options?.folderId === undefined)
        {
            queryInst = web.folders;
        }
        else
        {
            const rootFolder = resolveFolder(web, options.folderId);
            queryInst = rootFolder.folders;
        }

        return createInvokable(queryInst);
    }, [options?.folderId]);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable);

        return opt;
    }, [options, globalOptions]);

    useQueryEffect(invokableFactory, setFolders, _options, deps);

    return folders;
}