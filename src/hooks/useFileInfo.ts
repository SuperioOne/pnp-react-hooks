import "@pnp/sp/files";
import useQueryEffect from "./internal/useQuery";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { IWeb } from "@pnp/sp/webs/types";
import { Nullable, ODataQueryable, PnpHookOptions } from "../types";
import { ParameterError } from "../errors/ParameterError";
import { createInvokable, isUUID } from "../utils";
import { useState, useCallback } from "react";

export type FileInfoOptions = PnpHookOptions<ODataQueryable>

export function useFileInfo(
    fileIdentifier: string,
    options?: FileInfoOptions,
    deps?: React.DependencyList): Nullable<IFileInfo>
{
    const [fileInfo, setFileInfo] = useState<Nullable<IFileInfo>>(undefined);

    const invokableFactory = useCallback((web: IWeb) =>
    {
        if (fileIdentifier)
        {
            const isUniqueId = isUUID(fileIdentifier)
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
                    throw new ParameterError("useFile: fileIdentifier value is neither unique id or relative url.", fileIdentifier);
                }
            }

            return createInvokable(queryInstance);
        }
        else
        {
            throw new ParameterError("useFile: fileIdentifier value is empty.", fileIdentifier);
        }
    }, [fileIdentifier]);

    const mergedDeps = deps
        ? [fileIdentifier, ...deps]
        : [fileIdentifier];

    useQueryEffect(invokableFactory, setFileInfo, options, mergedDeps);

    return fileInfo;
}