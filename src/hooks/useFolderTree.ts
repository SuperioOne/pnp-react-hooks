import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import { CacheOptions, ExceptionOptions, Nullable, PnpActionFunction, RenderOptions, WebOptions } from "../types";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IFolder, IFolderInfo } from "@pnp/sp/folders/types";
import { IWeb } from "@pnp/sp/webs/types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isUrl, isUUID, mergeDependencies, resolveList, UrlType } from "../utils";
import { useRequestEffect } from "./internal/useRequestEffect";
import { useState, useCallback } from "react";

export interface FolderTreeOptions extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    list?: string;
    useCache?: undefined | boolean; // override custom ICachingOptions beacuse provided key gonna cause issues.
}

// TODO: Node and context management functions are missing and logic is not complete
interface TreeContext
{
    folders: Array<TreeNode<IFolderInfo>>;
    files: Array<TreeNode<IFileInfo>>;
    root: TreeNode<IFolderInfo>;
    up?: () => Promise<void>;
}

export function useFolderTree(
    folderIdentifier: string,
    options?: FolderTreeOptions,
    deps?: React.DependencyList): Nullable<TreeContext>
{
    const [folderTree, setFolderTree] = useState<Nullable<TreeContext>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        let rootFolder: IFolder;

        if (options?.list)
        {
            rootFolder = resolveList(web, options.list).rootFolder;
        }
        else
        {
            if (isUUID(folderIdentifier))
            {
                rootFolder = web.getFolderById(folderIdentifier);
            }
            else if (isUrl(folderIdentifier, UrlType.Relative))
            {
                rootFolder = web.getFolderByServerRelativeUrl(folderIdentifier);
            }
            else
            {
                throw new ParameterError(
                    "useFolderTree: folder identifier value is not valid.",
                    "folderIdentifier",
                    folderIdentifier);
            }
        }

        const buildTree: PnpActionFunction<IFolder, TreeContext> = async function ()
        {
            const promises = await Promise.all([
                this.get(),
                this.folders.get(),
                this.files.get()
            ]);

            const treeNode: TreeContext = {
                up: this.parentFolder.get,
                root: _mapNode(promises[0], this.folders),
                folders: promises[1].map(e => _mapNode(e, this.folders)),
                files: promises[2].map(e => _mapNode(e, this.files))
            };

            return treeNode;
        };

        return createInvokable(rootFolder, buildTree);

    }, [options?.list, folderIdentifier]);


    const _mergedDeps = mergeDependencies([folderIdentifier, options?.list], deps);

    useRequestEffect(invokableFactory, setFolderTree, options, _mergedDeps);

    return folderTree;
}

interface TreeNode<T extends IFolderInfo | IFileInfo>
{
    info: T;
    handle: T extends IFolderInfo ? IFolder : IFile;
}

const _mapNode = <T extends IFolderInfo | IFileInfo, R extends { getByName: (name: string) => T extends IFolderInfo ? IFolder : IFile }>(info: T, root: R): TreeNode<T> =>
({
    info: info,
    handle: root.getByName(info.Name)
});