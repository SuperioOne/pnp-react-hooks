import "@pnp/sp/appcatalog/web";
import { InternalContext } from "../../context";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

/**
 * Returns app detail collection from the app catalog.
 *
 * @template T
 * @param {import("./options").WebAppsOptions} [options] - PnP hook options
 * @param {import("react").DependencyList} [deps] - useApps refreshes response data when one of the dependencies changes.
 * @returns {T[] | null | undefined} App info array.
 */
export function useApps(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[T[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<T[] | null |undefined>>]} **/
  const [apps, setApps] = useState();

  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => {
      return options?.scope === "tenant"
        ? sp.tenantAppcatalog
        : sp.web.appcatalog;
    },
    [options?.scope],
  );

  const mergedDeps = mergeDependencies([options?.scope], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [globalOptions, options]);

  useQueryEffect(requestFactory, setApps, internalOpts, mergedDeps);

  return apps;
}
