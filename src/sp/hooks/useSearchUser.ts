import "@pnp/sp/profiles";
import {
  IClientPeoplePickerQueryParameters,
  IPeoplePickerEntity,
  IProfiles,
} from "@pnp/sp/profiles/types";
import { InternalContext } from "../../context";
import { PrincipalType, SPFI } from "@pnp/sp";
import {
  RenderOptions,
  ErrorOptions,
  ContextOptions,
  BehaviourOptions,
  DisableOptionValueType,
} from "../../types";
import { createInvokable } from "../createInvokable";
import { defaultCheckDisable, checkDisable } from "../checkDisable";
import { mergeDependencies, mergeOptions } from "../merge";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";
import { shallowEqual } from "../../utils/compare";

const DEFAULT_OPTIONS: IClientPeoplePickerQueryParameters = {
  AllowEmailAddresses: true,
  AllowMultipleEntities: true,
  MaximumEntitySuggestions: 25,
  PrincipalType: PrincipalType.All,
  QueryString: "",
};

export interface SearchUserOptions
  extends RenderOptions,
    ErrorOptions,
    BehaviourOptions,
    ContextOptions {
  disabled?:
    | DisableOptionValueType
    | { (searchOptions: IClientPeoplePickerQueryParameters | string): boolean };
}

/**
 * Searches for users or groups with specified search options.
 * @param searchOptions Search text or search query parameters. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useSearchUser refreshes response data when one of the dependencies changes.
 */
export function useSearchUser(
  searchOptions: IClientPeoplePickerQueryParameters | string,
  options?: SearchUserOptions,
  deps?: React.DependencyList,
): IPeoplePickerEntity[] | undefined | null {
  const globalOptions = useContext(InternalContext);
  const [people, setPeople] = useState<
    IPeoplePickerEntity[] | undefined | null
  >();
  const _searchQuery =
    useRef<IClientPeoplePickerQueryParameters>(DEFAULT_OPTIONS);

  const searchOpt =
    typeof searchOptions === "string"
      ? {
          ...DEFAULT_OPTIONS,
          QueryString: searchOptions,
        }
      : searchOptions;

  if (!shallowEqual(searchOpt, _searchQuery.current)) {
    _searchQuery.current = searchOpt;
  }

  const invokableFactory = useCallback(
    async (sp: SPFI) => {
      const action = function (this: IProfiles) {
        return this.clientPeoplePickerSearchUser(_searchQuery.current);
      };

      return createInvokable(sp.profiles, action);
    },
    [_searchQuery],
  );

  const _mergedDeps = mergeDependencies([_searchQuery.current], deps);

  const _options = useMemo(() => {
    const opt = mergeOptions<undefined>(globalOptions, options);
    opt.disabled = checkDisable(
      opt?.disabled,
      defaultCheckDisable,
      searchOptions,
    );

    return opt;
  }, [searchOptions, options, globalOptions]);

  useQueryEffect(invokableFactory, setPeople, _options, _mergedDeps);

  return people;
}
