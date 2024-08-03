import "@pnp/sp/folders";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveFolder } from "../resolveFolder.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {FolderOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IFolderInfo} from "@pnp/sp/folders" **/

/**
 * Return a folder.
 *
 * @param {string} folderId - Folder GUID Id or server relative path. Value is automatically tracked for changes.
 * @param {FolderOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFolderInfo | null | undefined}
 */
export function useFolder(folderId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFolderInfo | null | undefined, Dispatch<SetStateAction<IFolderInfo | null |undefined>> ]} **/
  const [folder, setFolder] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => resolveFolder(sp.web, folderId),
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
