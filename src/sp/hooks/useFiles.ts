import "@pnp/sp/files";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IFileInfo } from "@pnp/sp/files/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveFolder } from "../resolveFolder";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";
import { SPFI } from "@pnp/sp";

export interface FilesOptions extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (folderId: string): boolean };
}

/**
 * Returns file collection from folder.
 * @param folderId Folder GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useFiles refreshes response data when one of the dependencies changes.
 */
export function useFiles(
  folderId: string,
  options?: FilesOptions,
  deps?: React.DependencyList,
): Nullable<IFileInfo[]> {
  const globalOptions = useContext(InternalContext);
  const [files, setFiles] = useState<Nullable<IFileInfo[]>>(undefined);

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const rootFolder = resolveFolder(sp.web, folderId);
      return createInvokable(rootFolder.files);
    },
    [folderId],
  );

  const _mergedDeps = mergeDependencies([folderId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, folderId);

    return opt;
  }, [folderId, options, globalOptions]);

  useQueryEffect(invokableFactory, setFiles, _options, _mergedDeps);

  return files;
}
