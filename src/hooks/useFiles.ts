import "@pnp/sp/files";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryableCollection } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveFolder } from "../utils/resolveFolder";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FilesOptions extends PnpHookOptions<ODataQueryableCollection>
{
    disabled?: DisableOptionValueType | { (folderId: string): boolean };
}

export function useFiles(
    folderId: string,
    options?: FilesOptions,
    deps?: React.DependencyList): Nullable<IFileInfo[]>
{
    const globalOptions = useContext(InternalContext);
    const [files, setFiles] = useState<Nullable<IFileInfo[]>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const rootFolder = resolveFolder(web, folderId);

        return createInvokable(rootFolder.files);
    }, [folderId]);

    const _mergedDeps = mergeDependencies([folderId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, folderId);

        return opt;
    }, [folderId, options, globalOptions]);

    useQueryEffect(invokableFactory, setFiles, _options, _mergedDeps);

    return files;
}