import "@pnp/sp/appcatalog/web";
import { InternalContext } from "../../context";
import { ODataQueryableCollection, AppCatalogScopes } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * @inheritDoc
 */
export interface WebAppsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  scope?: AppCatalogScopes;
}

/**
 * Returns app detail collection from the app catalog.
 * @param options PnP hook options
 * @param deps useApps refreshes response data when one of the dependencies changes.
 * @returns App info array.
 */
export function useApps<T>(
  options?: WebAppsOptions,
  deps?: React.DependencyList,
): T[] | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [apps, setApps] = useState<T[] | null | undefined>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      return options?.scope === "tenant"
        ? createInvokable(sp.tenantAppcatalog)
        : createInvokable(sp.web.appcatalog);
    },
    [options?.scope],
  );

  const _mergedDeps = mergeDependencies([options?.scope], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [globalOptions, options]);

  useQueryEffect(invokableFactory, setApps, _options, _mergedDeps);

  return apps;
}
