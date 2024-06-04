import "@pnp/sp/files";
import { InternalContext } from "../../context";
import { assertString } from "../../utils/assert";
import { overrideAction } from "../createInvokable";
import { checkDisable } from "../checkDisable";
import { isUrl, isUUID, UrlType } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * @overload
 * Returns a file from file collection.
 * @param {string} fileId - File GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FileInfoOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFile refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/files").IFileInfo | null | undefined}
 */
/**
 * @overload
 * Returns file content as {@link Blob}.
 * @param {string} fileId - File GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FileBlobOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFile refreshes response data when one of the dependencies changes.
 * @returns {Blob | undefined | null}
 */
/**
 * @overload
 * Returns file content as {@link ArrayBuffer}.
 * @param {string} fileId - File GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FileBufferOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFile refreshes response data when one of the dependencies changes.
 * @returns {ArrayBuffer | undefined | null}
 */
/**
 * @overload
 * Returns file content as text.
 * @param {string} fileId - File GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FileTextOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFile refreshes response data when one of the dependencies changes.
 * @returns {string | undefined | null}
 */
/**
 * @param {string} fileId - File GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options")._BaseFileOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useFile refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/files").IFileInfo | ArrayBuffer | Blob | string | null |undefined}
 */
export function useFile(fileId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/files").IFileInfo | ArrayBuffer | Blob | string | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/files").IFileInfo | ArrayBuffer | Blob | string | null | undefined>>
   *  ]}
   **/
  const [fileInfo, setFileInfo] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => {
      assertString(fileId, "fileId is not valid string value.");

      const isUniqueId = isUUID(fileId);
      /** @type{import("@pnp/sp/files").IFile} **/
      let queryInst;

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
          return overrideAction(queryInst, queryInst.getBuffer);
        case "blob":
          return overrideAction(queryInst, queryInst.getBlob);
        case "text":
          return overrideAction(queryInst, queryInst.getText);
        default:
          return queryInst;
      }
    },
    [fileId, options?.type],
  );

  const mergedDeps = mergeDependencies([fileId, options?.type], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, fileId);

    return opt;
  }, [fileId, options, globalOptions]);

  useQueryEffect(requestFactory, setFileInfo, internalOpts, mergedDeps);

  return fileInfo;
}
