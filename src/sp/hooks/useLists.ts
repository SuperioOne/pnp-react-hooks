import { IListInfo } from "@pnp/sp/lists/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryableCollection } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type ListsOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns list collection.
 * @param options PnP hook options.
 * @param deps useLists refreshes response data when one of the dependencies changes.
 */
export function useLists(
  options?: ListsOptions,
  deps?: React.DependencyList,
): Nullable<IListInfo[]> {
  const globalOptions = useContext(InternalContext);
  const [lists, setLists] = useState<Nullable<IListInfo[]>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web.lists),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setLists, _options, deps);

  return lists;
}

