import "@pnp/sp/profiles";
import { InternalContext } from "../../context";
import { PrincipalType, SPFI } from "@pnp/sp";
import { overrideAction } from "../createInvokable";
import { checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";
import { shallowEqual } from "../../utils/compare";

/** @type{import("@pnp/sp/profiles").IClientPeoplePickerQueryParameters} **/
const DEFAULT_OPTIONS = {
  AllowEmailAddresses: true,
  AllowMultipleEntities: true,
  MaximumEntitySuggestions: 25,
  PrincipalType: PrincipalType.All,
  QueryString: "",
};

/**
 * Searches for users or groups with specified search options.
 *
 * @param {string | import("@pnp/sp/profiles").IClientPeoplePickerQueryParameters} searchOptions - Search text or search query parameters. Changing the value resends request.
 * @param {import("./options").SearchUserOptions} [options] - PnP hook options.
 * @param {import("react").DependencyList} [deps] - useSearchUser refreshes response data when one of the dependencies changes.
 * @returns {import("@pnp/sp/profiles").IPeoplePickerEntity[] | undefined | null}
 */
export function useSearchUser(searchOptions, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[import("@pnp/sp/profiles").IPeoplePickerEntity[] | null | undefined, import("react").Dispatch<import("react").SetStateAction<import("@pnp/sp/profiles").IPeoplePickerEntity[] | null |undefined>>]} **/
  const [people, setPeople] = useState();
  const searchQuery = useRef(DEFAULT_OPTIONS);
  const searchOpt =
    typeof searchOptions === "string"
      ? {
          ...DEFAULT_OPTIONS,
          QueryString: searchOptions,
        }
      : searchOptions;

  if (!shallowEqual(searchOpt, searchQuery.current)) {
    searchQuery.current = searchOpt;
  }

  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      /** @type{(this: import("@pnp/sp/profiles").IProfiles) => Promise<import("@pnp/sp/profiles").IPeoplePickerEntity[]>} **/
      const action = function () {
        return this.clientPeoplePickerSearchUser(searchQuery.current);
      };

      return overrideAction(sp.profiles, action);
    },
    [searchQuery],
  );

  const mergedDeps = mergeDependencies([searchQuery.current], deps);
  const internalOpts = useMemo(() => {
    const opt = mergeOptions(globalOptions, options);
    opt.disabled = checkDisable(opt?.disabled, searchOptions);

    return opt;
  }, [searchOptions, options, globalOptions]);

  useQueryEffect(requestFactory, setPeople, internalOpts, mergedDeps);

  return people;
}
