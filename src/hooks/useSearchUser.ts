import "@pnp/sp/profiles";
import { DisableOptionValueType } from "../types/options/RenderOptions";
import { IClientPeoplePickerQueryParameters, IPeoplePickerEntity } from "@pnp/sp/profiles/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { PrincipalType, spfi as sp } from "@pnp/sp";
import { RenderOptions, ExceptionOptions, LoadActionMode } from "../types/options";
import { compareTuples } from "../utils/compareTuples";
import { defaultCheckDisable, checkDisable } from "../utils/checkDisable";
import { errorHandler } from "../utils/errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { mergeOptions } from "../utils/merge";
import { shallowEqual } from "../utils/shallowEqual";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS: IClientPeoplePickerQueryParameters = {
    AllowEmailAddresses: true,
    AllowMultipleEntities: true,
    MaximumEntitySuggestions: 25,
    PrincipalType: PrincipalType.All,
    QueryString: ""
};

interface SearchUserOptions extends RenderOptions, ExceptionOptions
{
    disabled?: DisableOptionValueType | { (searchOptions: IClientPeoplePickerQueryParameters | string): boolean };
}

export function useSearchUser(
    searchOptions: IClientPeoplePickerQueryParameters | string,
    options?: SearchUserOptions,
    deps?: React.DependencyList): Nullable<IPeoplePickerEntity[]>
{
    const globalOptions = useContext(InternalContext);
    const [profiles, setProfiles] = useState<Nullable<IPeoplePickerEntity[]>>();
    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        searchOptions: null
    });

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        const mergedOptions = mergeOptions(globalOptions, options);
        const isDisabled = checkDisable(mergedOptions.disabled, defaultCheckDisable, searchOptions);

        if (isDisabled !== true)
        {
            const searchOptChanged = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.searchOptions, searchOptions);

            if (searchOptChanged)
            {
                _cleanup();

                if (mergedOptions?.requestActionOption !== LoadActionMode.KeepPrevious)
                {
                    setProfiles(undefined);
                }

                const observer: NextObserver<IPeoplePickerEntity[]> = {
                    next: setProfiles,
                    complete: _cleanup,
                    error: (err: Error) =>
                    {
                        setProfiles(null);
                        errorHandler(err, mergedOptions);
                    }
                };

                const opt = typeof searchOptions === "string"
                    ? {
                        ...DEFAULT_OPTIONS,
                        QueryString: searchOptions
                    }
                    : searchOptions;

                _subscription.current = from(sp().profiles.clientPeoplePickerSearchUser(opt))
                    .subscribe(observer);
            }

            _innerState.current = {
                externalDependencies: deps,
                searchOptions: searchOptions
            };
        }
    }, [searchOptions, options, globalOptions, deps, _cleanup]);

    return profiles;
}

interface TrackedState
{
    searchOptions: Nullable<IClientPeoplePickerQueryParameters | string>;
    externalDependencies: Nullable<React.DependencyList>
}