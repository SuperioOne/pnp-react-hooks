import "@pnp/sp/appcatalog";
import "@pnp/sp/appcatalog/web";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { assert } from "../../utils/assert.js";
import { checkDisable } from "../checkDisable.js";
import { isUUID } from "../../utils/is";
import { mergeDependencies, mergeOptions } from "../merge";
import { useContext, useState, useCallback, useMemo } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * Returns an app detail of the given Id from the app catalog.
 *
 * @template T
 * @param {string} appId - App GUID Id string. Changing the appId value resends request.
 * @param {import('./options').WebAppOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useApp refreshes response data when one of the dependencies changes.
 * @returns {T | null |undefined} App info object.
 */
export function useApp(appId, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[T | null | undefined, import("react").Dispatch<import("react").SetStateAction<T | null |undefined>>]} **/
  const [apps, setApps] = useState();
  const requestFactory = useCallback(
    (/** @type{import('@pnp/sp').SPFI} **/ sp) => {
      assert(isUUID(appId), "AppId is not a valid guid string.");

      if (options?.scope === "tenant") {
        return sp.tenantAppcatalog.getAppById(appId);
      } else {
        return sp.web.appcatalog.getAppById(appId);
      }
    },
    [appId, options?.scope],
  );

  const mergedDeps = mergeDependencies(
    [appId, options?.scope ?? "siteCollection"],
    deps,
  );
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, appId);

    return opt;
  }, [appId, options, globalOptions]);

  useQueryEffect(requestFactory, setApps, internalOpts, mergedDeps);

  return apps;
}
