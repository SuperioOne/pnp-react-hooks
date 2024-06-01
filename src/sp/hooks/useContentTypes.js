import "@pnp/sp/content-types";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { overrideAction } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface ItemContentTypeOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List GUID Id or title for getting list changes. Keep undefined for web changes.
   * Changing list value resends request.
   */
  list?: string;
}

/**
 * Returns content types of web or list. Use {@link ItemContentTypeOptions.list} property to get list content
 * types instead of web content types.
 * @param options PnP hook options.
 * @param deps useContentTypes refreshes response data when one of the dependencies changes.
 * @returns array of {@link IContentTypeInfo}.
 */
export function useContentTypes(
  options?: ItemContentTypeOptions,
  deps?: React.DependencyList,
): IContentTypeInfo[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [contentTypes, setContentTypes] = useState<
    IContentTypeInfo[] | undefined | null
  >();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const scope = resolveScope(sp.web, options?.list, undefined);
      return overrideAction(scope.contentTypes);
    },
    [options?.list],
  );

  const _mergedDeps = mergeDependencies([options?.list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setContentTypes, _options, _mergedDeps);

  return contentTypes;
}
