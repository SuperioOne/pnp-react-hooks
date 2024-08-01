import "@pnp/sp/content-types";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {ContentTypeOptions} from "./options.d.ts" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IContentTypeInfo} from "@pnp/sp/content-types" **/

/**
 * Returns content types of web or list. Use `ItemContentTypeOptions.list` property to get list content
 * types instead of web content types.
 *
 * @param {ContentTypeOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IContentTypeInfo[] | undefined | null}
 */
export function useContentTypes(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IContentTypeInfo[] | null | undefined, Dispatch<SetStateAction<IContentTypeInfo[] | null |undefined>> ]} **/
  const [contentTypes, setContentTypes] = useState();
  const requestFactory = useCallback(
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

  useQueryEffect(requestFactory, setContentTypes, internalOpts, mergedDeps);

  return contentTypes;
}
