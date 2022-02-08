import "@pnp/sp/folders";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IFolder } from "@pnp/sp/folders";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { resolveFolder } from "../utils/resolveFolder";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FolderOptions extends PnpHookOptions<ODataQueryable>
{
    disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

export function useFolder(
    folderId: string,
    options?: FolderOptions,
    deps?: React.DependencyList): Nullable<IFolder>
{
    const globalOptions = useContext(InternalContext);
    const [folder, setFolder] = useState<Nullable<IFolder>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const folder = resolveFolder(web, folderId);

        return createInvokable(folder);
    }, [folderId]);

    const _mergedDeps = mergeDependencies([folderId], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, folderId);

        return opt;
    }, [folderId, options, globalOptions]);

    useQueryEffect(invokableFactory, setFolder, _options, _mergedDeps);

    return folder;
}