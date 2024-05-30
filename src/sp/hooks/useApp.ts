import "@pnp/sp/appcatalog/web";
import "@pnp/sp/appcatalog";
import { SPFI } from "@pnp/sp";
import { useContext, useState, useCallback, useMemo } from "react";
import { InternalContext } from "../../context";
import { ODataQueryable } from "../../types/ODataQueryable";
import { AppCatalogScopes } from "../../types/literalTypes";
import { PnpHookOptions } from "../../types/options";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { Nullable } from "../../types/utilityTypes";
import { assert } from "../../utils/assert";
import { checkDisable, defaultCheckDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";

/**
 * @inheritDoc
 */
export interface WebAppOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (appId: string): boolean };
  scope?: AppCatalogScopes;
}

/**
 * Returns an app detail of the given Id from the app catalog.
 * @param appId App GUID Id string. Changing the appId value resends request.
 * @param options PnP hook options
 * @param deps useApp refreshes response data when one of the dependencies changes.
 * @returns App info object.
 */
export function useApp<T>(
  appId: string,
  options?: WebAppOptions,
  deps?: React.DependencyList,
): Nullable<T> {
  const globalOptions = useContext(InternalContext);
  const [apps, setApps] = useState<Nullable<T>>();

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      assert(isUUID(appId), "AppId is not a valid guid string.");

      if (options?.scope === "tenant") {
        return createInvokable(sp.tenantAppcatalog.getAppById(appId));
      } else {
        return createInvokable(sp.web.appcatalog.getAppById(appId));
      }
    },
    [appId, options?.scope],
  );

  const _mergedDeps = mergeDependencies([appId, options?.scope], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, appId);

    return opt;
  }, [appId, options, globalOptions]);

  useQueryEffect(invokableFactory, setApps, _options, _mergedDeps);

  return apps;
}
