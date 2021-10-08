import "@pnp/sp/folders";
import { IFolder } from "@pnp/sp/folders";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { createInvokable, mergeDependencies, resolveFolder } from "../utils";
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