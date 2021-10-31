import "@pnp/sp/files";
import { FileReturnTypes } from "../types/literalTypes";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { isUUID } from "../utils/isUUID";
import { isURL, UrlType } from "../utils/isURL";
import { mergeDependencies } from "../utils/mergeDependencies";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback } from "react";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface FileOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    type?: T;
}

export function useFile(
    fileId: string,
    options?: FileOptions,
    deps?: React.DependencyList): Nullable<IFileInfo>;

export function useFile(
    fileId: string,
    options?: FileOptions<"blob">,
    deps?: React.DependencyList): Nullable<Blob>;

export function useFile(
    fileId: string,
    options?: FileOptions<"buffer">,
    deps?: React.DependencyList): Nullable<ArrayBuffer>;

export function useFile(
    fileId: string,
    options?: FileOptions<"text">,
    deps?: React.DependencyList): Nullable<string>;

export function useFile(
    fileId: string,
    options?: FileOptions<FileReturnTypes>,
    deps?: React.DependencyList): Nullable<InstanceTypes>
{
    const [fileInfo, setFileInfo] = useState<Nullable<InstanceTypes>>(undefined);

    const invokableFactory = useCallback(async (web: IWeb) =>
    {
        assertString(fileId, "fileId is not valid string value.");

        const isUniqueId = isUUID(fileId);
        let queryInst: IFile;

        if (isUniqueId)
        {
            queryInst = web.getFileById(fileId);
        }
        else 
        {
            if (isURL(fileId, UrlType.Relative))
            {
                queryInst = web.getFileByServerRelativeUrl(fileId);
            }
            else
            {
                throw new TypeError("fileId value is neither unique id or relative url.");
            }
        }

        switch (options?.type)
        {
            case "buffer": return createInvokable(queryInst, queryInst.getBuffer);
            case "blob": return createInvokable(queryInst, queryInst.getBlob);
            case "text": return createInvokable(queryInst, queryInst.getText);
            default: return createInvokable(queryInst);
        }

    }, [fileId, options?.type]);

    const _mergedDeps = mergeDependencies([fileId, options?.type], deps);

    useQueryEffect(invokableFactory, setFileInfo, options, _mergedDeps);

    return fileInfo;
}