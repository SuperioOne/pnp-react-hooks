import "@pnp/sp/profiles";
import { InternalContext } from "../../context/pnpHookOptionProvider.js";
import { PrincipalType } from "@pnp/sp";
import { overrideAction } from "../createInvokable.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @type{import("@pnp/sp/profiles").IClientPeoplePickerQueryParameters} **/
const DEFAULT_OPTIONS = {
  AllowEmailAddresses: true,
  AllowMultipleEntities: true,
  MaximumEntitySuggestions: 25,
  PrincipalType: PrincipalType.All,
  QueryString: "",
};

/**
 * @param {string | import("@pnp/sp/profiles").IClientPeoplePickerQueryParameters} options
 * @returns { string }
 **/
function searchOptionsKey(options) {
  return typeof options === "string" ? options : "__QUERY_OBJ__";
}

/**
 * Searches for users or groups with specified search options.
 *
 * @param {string | import("@pnp/sp/profiles").IClientPeoplePickerQueryParameters} searchOptions - Search text or search query parameters. Changing the value resends request.
 * @param {import("./options.js").SearchUserOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSearchUser refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/profiles").IPeoplePickerEntity[] | undefined | null}
 */
export function useSearchUser(searchOptions, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[
   *    import("@pnp/sp/profiles").IPeoplePickerEntity[] | null | undefined,
   *    import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/profiles").IPeoplePickerEntity[] | null |undefined>>
   *  ]}
   **/
  const [people, setPeople] = useState();
  const requestFactory = useCallback(
    (/**@type{import('@pnp/sp').SPFI} **/ sp) => {
      const searchQuery =
        typeof searchOptions === "string"
          ? {
              ...DEFAULT_OPTIONS,
              QueryString: searchOptions,
            }
          : searchOptions;

      /** @type{(this: import("@pnp/sp/profiles").IProfiles) => Promise<import("@pnp/sp/profiles").IPeoplePickerEntity[]>} **/
      const action = function () {
        return this.clientPeoplePickerSearchUser(searchQuery);
      };

      return overrideAction(sp.profiles, action);
    },
    [searchOptions],
  );

  const mergedDeps = mergeDependencies([searchOptionsKey(searchOptions)], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, searchOptions);

    return opt;
  }, [searchOptions, options, globalOptions]);

  useQueryEffect(requestFactory, setPeople, internalOpts, mergedDeps);

  return people;
}
