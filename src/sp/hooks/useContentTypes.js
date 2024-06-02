import "@pnp/sp/content-types";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns content types of web or list. Use ItemContentTypeOptions.list property to get list content
 * types instead of web content types.
 *
 * @param {import("./options").ItemContentTypeOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useContentTypes refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/content-types").IContentTypeInfo[] | undefined | null}
 */
export function useContentTypes(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/content-types").IContentTypeInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/content-types").IContentTypeInfo[] | null |undefined>>]} **/
  const [contentTypes, setContentTypes] = useState();
  const invokableFactory = useCallback(
    (/**@type{SPFI} **/ sp) =>
      resolveScope(sp.web, options?.list, undefined).contentTypes,
    [options?.list],
  );

  const mergedDeps = mergeDependencies([options?.list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setContentTypes, internalOpts, mergedDeps);

  return contentTypes;
}
