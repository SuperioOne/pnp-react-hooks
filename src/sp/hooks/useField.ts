import "@pnp/sp/fields";
import { DisableOptionValueType } from "../../types";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { assertString } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FieldOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * List GUID Id or title for getting list field. Keep undefined for web field.
   * Changing list value resends request.
   */
  list?: string;
  disabled?: DisableOptionValueType | { (fieldId: string): boolean };
}

/**
 * Returns a field from web or list.
 * @param fieldId Field internal name or Id. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useField refreshes response data when one of the dependencies changes.
 */
export function useField(
  fieldId: string,
  options?: FieldOptions,
  deps?: React.DependencyList,
): IFieldInfo | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [field, setField] = useState<IFieldInfo | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assertString(fieldId, "fileId is not a valid string.");

      const scope = resolveScope(sp.web, options?.list, undefined);

      if (isUUID(fieldId)) {
        return createInvokable(scope.fields.getById(fieldId));
      } else {
        return createInvokable(scope.fields.getByInternalNameOrTitle(fieldId));
      }
    },
    [options?.list, fieldId],
  );

  const _mergedDeps = mergeDependencies([fieldId, options?.list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, fieldId);

    return opt;
  }, [fieldId, globalOptions, options]);

  useQueryEffect(invokableFactory, setField, _options, _mergedDeps);

  return field;
}
