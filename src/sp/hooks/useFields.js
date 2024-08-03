import "@pnp/sp/fields";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {FieldsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IFieldInfo} from "@pnp/sp/fields" **/

/**
 * Returns field collection from web or list.
 *
 * @param {FieldsOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFieldInfo[] | undefined | null}
 */
export function useFields(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFieldInfo[] | null | undefined, Dispatch<SetStateAction<IFieldInfo[] | null |undefined>> ]} **/
  const [fields, setFields] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) =>
      resolveScope(sp.web, options?.list, undefined).fields,
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
