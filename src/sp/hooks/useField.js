import "@pnp/sp/fields";
import { InternalContext } from "../../context";
import { assertString } from "../../utils/assert";
import { checkDisable } from "../checkDisable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

/**
 * Returns a field from web or list.
 *
 * @param {string} fieldId - Field internal name or Id. Changing the value resends request.
 * @param {import("./options").FieldOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useField refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/fields").IFieldInfo | null |undefined}
 */
export function useField(fieldId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/fields").IFieldInfo | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/fields").IFieldInfo | null |undefined>>
   *  ]}
   **/
  const [field, setField] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => {
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
