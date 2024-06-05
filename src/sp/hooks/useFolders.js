import "@pnp/sp/folders";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveFolder } from "../resolveFolder.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns folders from root. Use {@link FoldersOptions.rootFolderId} property to change root.
 *
 * @param {import("./options.js").FoldersOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useFolders refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/folders").IFolderInfo[] | null | undefined}
 */
export function useFolders(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/folders").IFolderInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/folders").IFolderInfo[] | null |undefined>>
   *  ]}
   **/
  const [folders, setFolders] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
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
