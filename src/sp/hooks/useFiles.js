import "@pnp/sp/files";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveFolder } from "../resolveFolder.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {FilesOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IFileInfo} from "@pnp/sp/files" **/

/**
 * Returns file collection from folder.
 *
 * @param {string} folderId - Folder GUID Id or server relative path. Value is automatically tracked for changes.
 * @param {FilesOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFileInfo[] | null | undefined}
 */
export function useFiles(folderId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFileInfo[] | null | undefined, Dispatch<SetStateAction<IFileInfo[] | null |undefined>> ]} **/
  const [files, setFiles] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI}**/ sp) => {
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
