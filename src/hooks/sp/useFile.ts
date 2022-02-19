import "@pnp/sp/files";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { FileReturnTypes } from "../../types/literalTypes";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { assertString } from "../../utils/assert";
import { createInvokable } from "../../utils/createInvokable";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { isUUID } from "../../utils/isUUID";
import { isUrl, UrlType } from "../../utils/isUrl";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface FileOptions<T extends FileReturnTypes = "info"> extends PnpHookOptions<ODataQueryable>
{
    /**
     * Return type. Changing type resends request.
     */
    type?: T;
    disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

/**
 * Returns a file from file collection.
 * @param fileId File GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useFile will resend request when one of the dependencies changed.
 */
export function useFile(
    fileId: string,
    options?: FileOptions,
    deps?: React.DependencyList): Nullable<IFileInfo>;

/**
* Returns file content as {@link Blob}.
* @param fileId File GUID Id or server relative path. Changing the value resends request.
* @param options PnP hook options
* @param deps useFile will resend request when one of the dependencies changed.
*/
export function useFile(
    fileId: string,
    options?: FileOptions<"blob">,
    deps?: React.DependencyList): Nullable<Blob>;

/**
* Returns file content as {@link ArrayBuffer}.
* @param fileId File GUID Id or server relative path. Changing the value resends request.
* @param options PnP hook options
* @param deps useFile will resend request when one of the dependencies changed.
*/
export function useFile(
    fileId: string,
    options?: FileOptions<"buffer">,
    deps?: React.DependencyList): Nullable<ArrayBuffer>;

/**
* Returns file content as text.
* @param fileId File GUID Id or server relative path. Changing the value resends request.
* @param options PnP hook options
* @param deps useFile will resend request when one of the dependencies changed.
*/
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

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        assertString(fileId, "fileId is not valid string value.");

        const isUniqueId = isUUID(fileId);
        let queryInst: IFile;

        if (isUniqueId)
        {
            queryInst = sp.web.getFileById(fileId);
        }
        else if (isUrl(fileId, UrlType.Relative))
        {
            queryInst = sp.web.getFileByServerRelativePath(fileId);
        }
        else
        {
            throw new TypeError("fileId value is neither unique id or relative url.");
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