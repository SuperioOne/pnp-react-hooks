import "@pnp/sp/files";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { FileReturnTypes } from "../types/literalTypes";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { ODataQueryable } from "../types/ODataQueryable";
import { PnpHookOptions } from "../types/options";
import { assertString } from "../utils/assert";
import { createInvokable } from "../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../utils/checkDisable";
import { isUUID } from "../utils/isUUID";
import { isUrl, UrlType } from "../utils/isUrl";
import { mergeDependencies, mergeOptions } from "../utils/merge";
import { useQueryEffect } from "./internal/useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface FileOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    type?: T;
    disabled?: DisableOptionValueType | { (fileId: string): boolean };
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
    const globalOptions = useContext(InternalContext);
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
            if (isUrl(fileId, UrlType.Relative))
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

    const _options = useMemo(() =>
    {
        const opt = mergeOptions(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, fileId);

        return opt;
    }, [fileId, options, globalOptions]);

    useQueryEffect(invokableFactory, setFileInfo, _options, _mergedDeps);

    return fileInfo;
}