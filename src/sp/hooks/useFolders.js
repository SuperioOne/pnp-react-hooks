import "@pnp/sp/folders";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveFolder } from "../resolveFolder";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns folders from root. Use {@link FoldersOptions.rootFolderId} property to change root.
 *
 * @param {import("./options").FoldersOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useFolders refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/folders").IFolderInfo[] | null | undefined}
 */
export function useFolders(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/folders").IFolderInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/folders").IFolderInfo[] | null |undefined>>]} **/
  const [folders, setFolders] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      if (options?.rootFolderId === undefined) {
        return sp.web.folders;
      } else {
        const rootFolder = resolveFolder(sp.web, options.rootFolderId);
        return rootFolder.folders;
      }
    },
    [options?.rootFolderId],
  );

  const mergedDeps = mergeDependencies([options?.rootFolderId], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setFolders, internalOpts, mergedDeps);

  return folders;
}
