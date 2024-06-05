import "@pnp/sp/content-types";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns content types of web or list. Use ItemContentTypeOptions.list property to get list content
 * types instead of web content types.
 *
 * @param {import("./options.js").ItemContentTypeOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useContentTypes refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/content-types").IContentTypeInfo[] | undefined | null}
 */
export function useContentTypes(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/content-types").IContentTypeInfo[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/content-types").IContentTypeInfo[] | null |undefined>>
   *  ]}
   **/
  const [contentTypes, setContentTypes] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) =>
      resolveScope(sp.web, options?.list, undefined).contentTypes,
    [options?.list],
  );

  const mergedDeps = mergeDependencies([options?.list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setContentTypes, internalOpts, mergedDeps);

  return contentTypes;
}
