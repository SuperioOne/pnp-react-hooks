import "@pnp/sp/profiles";
import { ExceptionOptions, LoadActionMode, Nullable, RenderOptions } from "../types";
import { IClientPeoplePickerQueryParameters, IPeoplePickerEntity } from "@pnp/sp/profiles/types";
import { InternalContext } from "../context";
import { compareTuples, errorHandler, shallowEqual } from "../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { sp } from "@pnp/sp";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS: IClientPeoplePickerQueryParameters = {
    AllowEmailAddresses: true,
    AllowMultipleEntities: true,
    MaximumEntitySuggestions: 25,
    QueryString: ""
};

interface SearchUserOptions extends RenderOptions, ExceptionOptions { }

export function useSearchUser(
    searchOptions: IClientPeoplePickerQueryParameters | string,
    options?: SearchUserOptions,
    deps?: React.DependencyList): Nullable<IPeoplePickerEntity[]>
{
    const [profiles, setProfiles] = useState<Nullable<IPeoplePickerEntity[]>>();

    const globalOptions = useContext(InternalContext);

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
        const optionsChanged = !compareTuples(_innerState.current.externalDependencies, deps)
            || !shallowEqual(_innerState.current.searchOptions, searchOptions);

        if (optionsChanged)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            _cleanup();

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
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

            _subscription.current = from(sp.profiles.clientPeoplePickerSearchUser(opt))
                .subscribe(observer);
        }

        _innerState.current = {
            externalDependencies: deps,
            searchOptions: searchOptions
        };
        
    }, [searchOptions, options, globalOptions, deps, _cleanup]);

    return profiles;
}

interface TrackedState
{
    searchOptions: Nullable<IClientPeoplePickerQueryParameters | string>;
    externalDependencies: Nullable<React.DependencyList>
}