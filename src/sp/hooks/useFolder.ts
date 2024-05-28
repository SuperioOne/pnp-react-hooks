import "@pnp/sp/folders";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable, defaultCheckDisable } from "../../utils/checkDisable";
import { createInvokable } from "../../utils/createInvokable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { resolveFolder } from "../resolvers";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FolderOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

/**
 * Return a folder.
 * @param folderId Folder GUID Id or server relative path. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useFolder refreshes response data when one of the dependencies changes.
 */
export function useFolder(
  folderId: string,
  options?: FolderOptions,
  deps?: React.DependencyList,
): Nullable<IFolderInfo> {
  const globalOptions = useContext(InternalContext);
  const [folder, setFolder] = useState<Nullable<IFolderInfo>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const folder = resolveFolder(sp.web, folderId);
      return createInvokable(folder);
    },
    [folderId],
  );

  const _mergedDeps = mergeDependencies([folderId], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, folderId);

    return opt;
  }, [folderId, options, globalOptions]);

  useQueryEffect(invokableFactory, setFolder, _options, _mergedDeps);

  return folder;
}
