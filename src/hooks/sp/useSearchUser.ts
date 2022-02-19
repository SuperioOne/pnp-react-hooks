import "@pnp/sp/profiles";
import { BehaviourOptions } from "../../types/options/BehaviourOptions";
import { DisableOptionValueType } from "../../types/options/RenderOptions";
import { IClientPeoplePickerQueryParameters, IPeoplePickerEntity, IProfiles } from "@pnp/sp/profiles/types";
import { InternalContext } from "../../context";
import { Nullable } from "../../types/utilityTypes";
import { PrincipalType, SPFI } from "@pnp/sp";
import { RenderOptions, ErrorOptions, ContextOptions } from "../../types/options";
import { createInvokable } from "../../utils/createInvokable";
import { defaultCheckDisable, checkDisable } from "../../utils/checkDisable";
import { mergeDependencies, mergeOptions } from "../../utils/merge";
import { useCallback, useContext, useMemo, useState } from "react";
import { useQueryEffect } from "../useQueryEffect";

const DEFAULT_OPTIONS: IClientPeoplePickerQueryParameters = {
    AllowEmailAddresses: true,
    AllowMultipleEntities: true,
    MaximumEntitySuggestions: 25,
    PrincipalType: PrincipalType.All,
    QueryString: ""
};

interface SearchUserOptions extends RenderOptions, ErrorOptions, BehaviourOptions, ContextOptions
{
    disabled?: DisableOptionValueType | { (searchOptions: IClientPeoplePickerQueryParameters | string): boolean };
}

/**
 * Searches for users or groups with specified search options.
 * @param searchOptions Search text or search query parameters. Changing the value resends request.
 * @param options PnP hook options.
 * @param deps useSearchUser will resend request when one of the dependencies changed.
 */
export function useSearchUser(
    searchOptions: IClientPeoplePickerQueryParameters | string,
    options?: SearchUserOptions,
    deps?: React.DependencyList): Nullable<IPeoplePickerEntity[]>
{
    const globalOptions = useContext(InternalContext);
    const [profiles, setProfiles] = useState<Nullable<IPeoplePickerEntity[]>>();

    const _searchQuery = useMemo(() =>
    {
        return typeof searchOptions === "string"
            ? {
                ...DEFAULT_OPTIONS,
                QueryString: searchOptions
            }
            : searchOptions;
    }, [searchOptions]);

    const invokableFactory = useCallback(async (sp: SPFI) =>
    {
        const action = function (this: IProfiles)
        {
            return this.clientPeoplePickerSearchUser(_searchQuery);
        };

        return createInvokable(sp.profiles, action);
    }, [_searchQuery]);

    const _mergedDeps = mergeDependencies([_searchQuery], deps);

    const _options = useMemo(() =>
    {
        const opt = mergeOptions<undefined>(globalOptions, options);
        opt.disabled = checkDisable(opt?.disabled, defaultCheckDisable, searchOptions);

        return opt;
    }, [searchOptions, options, globalOptions]);

    useQueryEffect(invokableFactory, setProfiles, _options, _mergedDeps);

    return profiles;
}