import "@pnp/sp/fields";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns field collection from web or list.
 *
 * @param {import("./options").FieldsOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useFields refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/fields").IFieldInfo[] | undefined | null}
 */
export function useFields(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/fields").IFieldInfo[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/fields").IFieldInfo[] | null |undefined>>]} **/
  const [fields, setFields] = useState();

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => resolveScope(sp.web, options?.list, undefined),
    [options?.list],
  );

  const mergedDeps = mergeDependencies([options?.list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(requestFactory, setFields, internalOpts, mergedDeps);

  return fields;
}
