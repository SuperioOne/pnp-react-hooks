import "@pnp/sp/folders";
import { IFolder } from "@pnp/sp/folders";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { createInvokable } from "../utils/createInvokable";
import { mergeDependencies } from "../utils/mergeDependencies";
import { resolveFolder } from "../utils/resolveFolder";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

export type FolderOptions = PnpHookOptions<ODataQueryable>;

export function useFolder(
    folderId: string,
    options?: FolderOptions,
    deps?: React.DependencyList): Nullable<IFolder>
{
    const [folder, setFolder] = useState<Nullable<IFolder>>();

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        const folder = resolveFolder(web, folderId);

        return createInvokable(folder);

    }, [folderId]);

    const _mergedDeps = mergeDependencies([folderId], deps);

    useQueryEffect(invokableFactory, setFolder, options, _mergedDeps);

    return folder;
}