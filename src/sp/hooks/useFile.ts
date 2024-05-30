import "@pnp/sp/files";
import { DisableOptionValueType } from "../../types";
import { FileReturnTypes, ODataQueryable } from "../types";
import { IFile, IFileInfo } from "@pnp/sp/files/types";
import { InternalContext } from "../../context";
import { PnpHookOptions } from "../types";
import { assertString } from "../../utils/assert";
import { createInvokable } from "../createInvokable";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { isUrl, isUUID, UrlType } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

type InstanceTypes = IFileInfo | ArrayBuffer | Blob | string;

export interface _BaseFileOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * Return type. Changing type resends request.
   */
  type?: FileReturnTypes;
  disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

export interface FileInfoOptions extends _BaseFileOptions {
  type?: "info" | undefined;
}

export interface FileTextOptions extends Omit<_BaseFileOptions, "query"> {
  type: "text";
}

export interface FileBufferOptions extends Omit<_BaseFileOptions, "query"> {
  type: "buffer";
}

export interface FileBlobOptions extends Omit<_BaseFileOptions, "query"> {
  type: "blob";
}

/**
 * Returns a file from file collection.
 * @param fileId File GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useFile refreshes response data when one of the dependencies changes.
 */
export function useFile(
  fileId: string,
  options?: FileInfoOptions,
  deps?: React.DependencyList,
): IFileInfo | null | undefined;

/**
 * Returns file content as {@link Blob}.
 * @param fileId File GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useFile refreshes response data when one of the dependencies changes.
 */
export function useFile(
  fileId: string,
  options?: FileBlobOptions,
  deps?: React.DependencyList,
): Blob | null | undefined;

/**
 * Returns file content as {@link ArrayBuffer}.
 * @param fileId File GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useFile refreshes response data when one of the dependencies changes.
 */
export function useFile(
  fileId: string,
  options?: FileBufferOptions,
  deps?: React.DependencyList,
): ArrayBuffer | null | undefined;

/**
 * Returns file content as text.
 * @param fileId File GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options
 * @param deps useFile refreshes response data when one of the dependencies changes.
 */
export function useFile(
  fileId: string,
  options?: FileTextOptions,
  deps?: React.DependencyList,
): string | null | undefined;

export function useFile(
  fileId: string,
  options?: _BaseFileOptions,
  deps?: React.DependencyList,
): InstanceTypes | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [fileInfo, setFileInfo] = useState<InstanceTypes | null | undefined>(
    undefined,
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertString(fileId, "fileId is not valid string value.");

      const isUniqueId = isUUID(fileId);
      let queryInst: IFile;

      if (isUniqueId) {
        queryInst = sp.web.getFileById(fileId);
      } else if (isUrl(fileId, UrlType.Relative)) {
        queryInst = sp.web.getFileByServerRelativePath(fileId);
      } else {
        throw new TypeError(
          "fileId value is neither unique id or relative url.",
        );
      }

      switch (options?.type) {
        case "buffer":
          return createInvokable(queryInst, queryInst.getBuffer);
        case "blob":
          return createInvokable(queryInst, queryInst.getBlob);
        case "text":
          return createInvokable(queryInst, queryInst.getText);
        default:
          return createInvokable(queryInst);
      }
    },
    [fileId, options?.type],
  );

  const _mergedDeps = mergeDependencies([fileId, options?.type], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, fileId);

    return opt;
  }, [fileId, options, globalOptions]);

  useQueryEffect(invokableFactory, setFileInfo, _options, _mergedDeps);

  return fileInfo;
}
