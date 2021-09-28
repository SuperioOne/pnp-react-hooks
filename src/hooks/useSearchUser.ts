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
    deps?: React.DependencyList): Nullable<Array<IPeoplePickerEntity>>
{
    const [profiles, setProfiles] = useState<Nullable<Array<IPeoplePickerEntity>>>();

    const globalOptions = useContext(InternalContext);

    const _subscription = useRef<Nullable<Subscription>>(undefined);
    const _searchOptions = useRef<Nullable<IClientPeoplePickerQueryParameters | string>>(null);
    const _prevDeps = useRef<Nullable<React.DependencyList>>(null);

    const _cleanUp = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(_cleanUp, [_cleanUp]);

    useEffect(() =>
    {
        const optionsChanged = !compareTuples(_prevDeps.current, deps)
            || !shallowEqual(_searchOptions.current, searchOptions);

        if (optionsChanged)
        {
            const mergedOptions = options
                ? { ...globalOptions, ...options }
                : globalOptions;

            _cleanUp();

            if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
            {
                setProfiles(undefined);
            }

            const observer: NextObserver<Array<IPeoplePickerEntity>> = {
                next: setProfiles,
                complete: _cleanUp,
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

        _prevDeps.current = deps;
        _searchOptions.current = searchOptions;

    }, [searchOptions, options, globalOptions, deps, _cleanUp]);

    return profiles;
}