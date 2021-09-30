import "@pnp/sp/files";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions, FileReturnTypes } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isUrl, isUUID, mergeDependencies, UrlType } from "../utils";
import { useState, useCallback } from "react";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface FileOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    type?: T;
}

export function useFile(fileId: string, options?: FileOptions, deps?: React.DependencyList): Nullable<IFileInfo>;
export function useFile(fileId: string, options?: FileOptions<"blob">, deps?: React.DependencyList): Nullable<Blob>;
export function useFile(fileId: string, options?: FileOptions<"buffer">, deps?: React.DependencyList): Nullable<ArrayBuffer>;
export function useFile(fileId: string, options?: FileOptions<"text">, deps?: React.DependencyList): Nullable<string>;
export function useFile(fileId: string, options?: FileOptions<FileReturnTypes>, deps?: React.DependencyList): Nullable<InstanceTypes>
{
    const [fileInfo, setFileInfo] = useState<Nullable<InstanceTypes>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        if (fileId)
        {
            const isUniqueId = isUUID(fileId);
            let queryInst: IFile;

            if (isUniqueId)
            {
                queryInst = web.getFileById(fileId);
            }
            else 
            {
                if (isUrl(fileId, UrlType.Relative))
                {
                    queryInst = web.getFileByServerRelativeUrl(fileId);
                }
                else
                {
                    throw new ParameterError(
                        "useFile: fileId value is neither unique id or relative url.",
                        "fileId",
                        fileId);
                }
            }

            switch (options?.type)
            {
                case "buffer": return createInvokable(queryInst, queryInst.getBuffer);
                case "blob": return createInvokable(queryInst, queryInst.getBlob);
                case "text": return createInvokable(queryInst, queryInst.getText);
                default: return createInvokable(queryInst);
            }
        }
        else
        {
            throw new ParameterError("useFile: fileId value is empty.", "fileId", fileId);
        }
    }, [fileId, options?.type]);

    const _mergedDeps = mergeDependencies([fileId, options?.type], deps);

    useQueryEffect(invokableFactory, setFileInfo, options, _mergedDeps);

    return fileInfo;
}