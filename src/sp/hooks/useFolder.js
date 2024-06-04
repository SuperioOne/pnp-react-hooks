import "@pnp/sp/folders";
import { InternalContext } from "../../context";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveFolder } from "../resolveFolder";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Return a folder.
 *
 * @param {string} folderId - Folder GUID Id or server relative path. Changing the value resends request.
 * @param {import("./options").FolderOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useFolder refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/folders").IFolderInfo | null | undefined}
 */
export function useFolder(folderId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/folders").IFolderInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/folders").IFolderInfo | null |undefined>>
   *  ]}
   **/
  const [folder, setFolder] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) =>
      resolveFolder(sp.web, folderId),
    [folderId],
  );

  const mergedDeps = mergeDependencies([folderId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, folderId);

    return opt;
  }, [folderId, options, globalOptions]);

  useQueryEffect(requestFactory, setFolder, internalOpts, mergedDeps);

  return folder;
}
