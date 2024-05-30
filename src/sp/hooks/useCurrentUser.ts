import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { ODataQueryable } from "../../types/ODataQueryable";
import { PnpHookOptions } from "../../types/options";
import { SPFI } from "@pnp/sp";
import { checkDisable } from "../checkDisable";
import { createInvokable } from "../createInvokable";
import { mergeOptions } from "../merge";
import { useQueryEffect } from "../useQueryEffect";
import { useState, useCallback, useContext, useMemo } from "react";

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

/**
 * Returns current user information.
 * @param options PnP hook options
 * @param deps useCurrentUser refreshes response data when one of the dependencies changes.
 */
export function useCurrentUser(
  options?: CurrentUserInfoOptions,
  deps?: React.DependencyList,
): Nullable<ISiteUserInfo> {
  const globalOptions = useContext(InternalContext);
  const [currentUser, setCurrentUser] =
    useState<Nullable<ISiteUserInfo>>(undefined);

  const invocableFactory = useCallback(
    async (sp: SPFI) => createInvokable(sp.web.currentUser),
    [],
  );

  const _options = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled);

    return opt;
  }, [options, globalOptions]);

  useQueryEffect(invocableFactory, setCurrentUser, _options, deps);

  return currentUser;
}

