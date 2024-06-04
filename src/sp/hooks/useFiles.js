import "@pnp/sp/files";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveFolder } from "../resolveFolder";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns file collection from folder.
 *
 * @param {string} folderId - Folder GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FilesOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useFiles refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/files").IFileInfo[] | null | undefined}
 */
export function useFiles(folderId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/files").IFileInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/files").IFileInfo[] | null |undefined>>
   *  ]}
   **/
  const [files, setFiles] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI}**/ sp) => {
      const rootFolder = resolveFolder(sp.web, folderId);
      return rootFolder.files;
    },
    [folderId],
  );

  const mergedDeps = mergeDependencies([folderId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, folderId);

    return opt;
  }, [folderId, options, globalOptions]);

  useQueryEffect(requestFactory, setFiles, internalOpts, mergedDeps);

  return files;
}
