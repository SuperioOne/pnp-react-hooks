import "@pnp/sp/profiles";
import { InternalContext } from "../../context/internalContext.js";
import { PrincipalType } from "@pnp/sp";
import { overrideAction } from "../overrideAction.js";
import { checkDisable } from "../checkDisable.js";
import { mergeDependencies, mergeOptions } from "../merge.js";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect.js";

/** @import {DependencyList, Dispatch, SetStateAction} from "react" **/
/** @import {SearchUserOptions} from "./options.js" **/
/** @import {SPFI} from "@pnp/sp" **/
/** @import {IClientPeoplePickerQueryParameters, IPeoplePickerEntity, IProfiles} from "@pnp/sp/profiles" **/

/** @type{IClientPeoplePickerQueryParameters} **/
const DEFAULT_OPTIONS = {
  AllowEmailAddresses: true,
  AllowMultipleEntities: true,
  MaximumEntitySuggestions: 25,
  PrincipalType: PrincipalType.All,
  QueryString: "",
};

/**
 * @param {string | IClientPeoplePickerQueryParameters} options
 * @returns { string }
 **/
function searchOptionsKey(options) {
  return typeof options === "string" ? options : "__QUERY_OBJ__";
}

/**
 * Searches for users or groups with specified search options.
 *
 * @param {string | IClientPeoplePickerQueryParameters} searchOptions - Search text or search query parameters. Value is automatically tracked for changes.
 * @param {SearchUserOptions} [options] - Hook options.
 * @param {DependencyList} [deps] - Custom dependency list.
 * @returns {IPeoplePickerEntity[] | undefined | null}
 */
export function useSearchUser(searchOptions, options, deps) {
  const globalOptions = useContext(InternalContext);
  /** @type{[ IPeoplePickerEntity[] | null | undefined, Dispatch<SetStateAction<IPeoplePickerEntity[] | null |undefined>> ]} **/
  const [people, setPeople] = useState();
  const requestFactory = useCallback(
    (/**@type{SPFI} **/ sp) => {
      const searchQuery =
        typeof searchOptions === "string"
          ? {
              ...DEFAULT_OPTIONS,
              QueryString: searchOptions,
            }
          : searchOptions;

      /** @type{(this: IProfiles) => Promise<IPeoplePickerEntity[]>} **/
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
