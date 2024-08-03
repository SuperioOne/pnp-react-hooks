import "@pnp/sp/appcatalog/web.js";
import { InternalContext } from "../../context/internalContext.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {WebAppsOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/

/**
 * Returns app detail collection from the app catalog.
 *
 * @template T
 * @param {WebAppsOptions} [options] - Hook options
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {T[] | null | undefined} App info array.
 */
export function useApps(options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ T[] | null | undefined, Dispatch<SetStateAction<T[] | null |undefined>> ]} **/
  const [apps, setApps] = useState();
  const requestFactory = useCallback(
    (/** @type{SPFI} **/ sp) => {
      return options?.scope === "tenant"
        ? sp.tenantAppcatalog
        : sp.web.appcatalog;
    },
    [options?.scope],
  );

  const mergedDeps = mergeDependencies(
    [options?.scope ?? "siteCollection"],
    deps,
  );
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [globalOptions, options]);

  useQueryEffect(requestFactory, setApps, internalOpts, mergedDeps);

  return apps;
}
