import "@pnp/sp/folders";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveFolder } from "../resolveFolder.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {FoldersOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IFolderInfo} from "@pnp/sp/folders" **/

/**
 * Returns folders from root. Use `FoldersOptions.rootFolderId` property to change root.
 *
 * @param {FoldersOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFolderInfo[] | null | undefined}
 */
export function useFolders(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFolderInfo[] | null | undefined, Dispatch<SetStateAction<IFolderInfo[] | null |undefined>> ]} **/
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
