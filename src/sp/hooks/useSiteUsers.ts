import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { ODataQueryableCollection } from "../types";
import { PnpHookOptions } from "../types";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type SiteUsersOptions = PnpHookOptions<ODataQueryableCollection>;

/**
 * Returns site users.
 * @param options PnP hook options.
 * @param deps useSiteUsers refreshes response data when one of the dependencies changes.
 */
export function useSiteUsers(
  options?: SiteUsersOptions,
  deps?: React.DependencyList,
): ISiteUserInfo[] | null | undefined {
  const globalOptions = useContext(InternalContext);
  const [siteUser, setSiteUser] = useState<ISiteUserInfo[] | null | undefined>(
    undefined,
  );

  const invokableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web.siteUsers),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invokableFactory, setSiteUser, _options, deps);

  return siteUser;
}
