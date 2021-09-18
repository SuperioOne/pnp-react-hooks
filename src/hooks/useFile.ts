import "@pnp/sp/files";
import { useQueryEffect } from "./internal/useQueryEffect";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions, FileReturnTypes } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isUUID } from "../utils";
import { useState, useCallback } from "react";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface FileOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    type?: T;
}

export function useFile(fileIdentifier: string, options?: FileOptions, deps?: React.DependencyList): Nullable<IFileInfo>;
export function useFile(fileIdentifier: string, options?: FileOptions<"blob">, deps?: React.DependencyList): Nullable<Blob>;
export function useFile(fileIdentifier: string, options?: FileOptions<"buffer">, deps?: React.DependencyList): Nullable<ArrayBuffer>;
export function useFile(fileIdentifier: string, options?: FileOptions<"text">, deps?: React.DependencyList): Nullable<string>;
export function useFile(fileIdentifier: string, options?: FileOptions<FileReturnTypes>, deps?: React.DependencyList): Nullable<InstanceTypes>
{
    const [fileInfo, setFileInfo] = useState<Nullable<InstanceTypes>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (fileIdentifier)
        {
            const isUniqueId = isUUID(fileIdentifier);
            let queryInstance: IFile;

            if (isUniqueId)
            {
                queryInstance = web.getFileById(fileIdentifier);
            }
            else 
            {
                // TODO: validate relative url
                const isRelativeUrl = true;

                if (isRelativeUrl)
                {
                    queryInstance = web.getFileByServerRelativeUrl(fileIdentifier);
                }
                else
                {
                    throw new ParameterError("useFile: fileIdentifier value is neither unique id or relative url.", "fileIdentifier", fileIdentifier);
                }
            }

            switch (options?.type)
            {
                case "buffer": return createInvokable(queryInstance, queryInstance.getBuffer);
                case "blob": return createInvokable(queryInstance, queryInstance.getBlob);
                case "text": return createInvokable(queryInstance, queryInstance.getText);
                default: return createInvokable(queryInstance);
            }
        }
        else
        {
            throw new ParameterError("useFile: fileIdentifier value is empty.", "fileIdentifier", fileIdentifier);
        }
    }, [fileIdentifier, options?.type]);

    const mergedDeps = deps
        ? [fileIdentifier, options?.type].concat(deps)
        : [fileIdentifier, options?.type];

    useQueryEffect(invokableFactory, setFileInfo, options, mergedDeps);

    return fileInfo;
}