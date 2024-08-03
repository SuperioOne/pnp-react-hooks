import "@pnp/sp/fields";
import { InternalContext } from "../../context/internalContext.js";
import { assertString } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { isUUID } from "../../utils/is.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { resolveScope } from "../resolveScope.js";
import { useQueryEffect } from "../useQueryEffect.js";
import { useState, useCallback, useContext, useMemo } from "react";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {IFieldInfo} from "@pnp/sp/fields" **/
/** @import {PnpHookOptions, ODataQueryable} from "../types.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {FieldOptions} from "./options.js" **/

/**
 * Returns a field from web or list.
 *
 * @param {string} fieldId - Field internal name or UUID. Value is automatically tracked for changes.
 * @param {FieldOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IFieldInfo | null |undefined}
 */
export function useField(fieldId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IFieldInfo | null | undefined, Dispatch<SetStateAction<IFieldInfo | null |undefined>> ]} **/
  const [field, setField] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => {
      assertString(fieldId, "fileId is not a valid string.");

      const scope = resolveScope(sp.web, options?.list, undefined);

      if (isUUID(fieldId)) {
        return scope.fields.getById(fieldId);
      } else {
        return scope.fields.getByInternalNameOrTitle(fieldId);
      }
    },
    [options?.list, fieldId],
  );

  const mergedDeps = mergeDependencies([fieldId, options?.list], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, fieldId);

    return opt;
  }, [fieldId, globalOptions, options]);

  useQueryEffect(requestFactory, setField, internalOpts, mergedDeps);

  return field;
}
