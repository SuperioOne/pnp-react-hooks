import "@pnp/sp/fields";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { resolveScope } from "../resolveScope";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export interface FieldsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List GUID Id or title for getting list fields. Keep undefined for web fields.
   * Changing list value resends request.
   */
  list?: string;
}

/**
 * Returns field collection from web or list.
 * @param options PnP hook options.
 * @param deps useFields refreshes response data when one of the dependencies changes.
 */
export function useFields(
  options?: FieldsOptions,
  deps?: React.DependencyList,
): IFieldInfo[] | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [fields, setFields] = useState<IFieldInfo[] | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const scope = resolveScope(sp.web, options?.list, undefined);
      return createInvokable(scope.fields);
    },
    [options?.list],
  );

  const _mergedDeps = mergeDependencies([options?.list], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setFields, _options, _mergedDeps);

  return fields;
}
