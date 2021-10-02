import { ChangeTokenInfo, ExceptionOptions, Nullable, WebOptions } from "../types";
import { IList } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { compareTuples, errorHandler, resolveList, resolveWeb, shallowEqual } from "../utils";
import { useCallback, useEffect, useRef, useContext } from "react";
import { NextObserver, Subscription, interval as intervalObserver, Observable, switchMap, from } from "rxjs";
import { InternalContext } from "../context";

export interface ListChangeOptions extends WebOptions, ExceptionOptions
{
    disabled?: boolean;
}

export function useListChangeEffect(
    list: string,
    interval: number,
    action: (token: ChangeTokenInfo) => void,
    options?: ListChangeOptions,
    deps?: React.DependencyList)
{
    const globalOptions = useContext(InternalContext);

    const _token = useRef<ChangeTokenInfo>();
    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        interval: null,
        list: null,
        webOptions: null
    });

    const _subscription = useRef<Nullable<Subscription>>(undefined);
    const _observable = useRef<Nullable<Observable<number>>>(undefined);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        const webOption = options?.web ?? globalOptions?.web;

        if (options?.disabled === false)
        {
            _cleanup();
        }
        else
        {
            const shouldUpdate = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, webOption)
                || _innerState.current.interval !== interval
                || _innerState.current.list !== list;

            if (shouldUpdate)
            {
                _cleanup();

                const mergedOptions = options
                    ? { ...globalOptions, ...options }
                    : globalOptions;

                const web = resolveWeb(mergedOptions);
                const spList = resolveList(web, list)
                    .select(
                        "CurrentChangeToken",
                        "ID",
                        "LastItemDeletedDate",
                        "LastItemModifiedDate",
                        "LastItemUserModifiedDate");

                // if observable is null or interval is changed register a new one.
                if (!_observable.current || _innerState.current.interval !== interval)
                    _observable.current = intervalObserver(interval);

                const observer: NextObserver<ChangeTokenInfo> = {
                    next: (newToken) =>
                    {
                        if (!shallowEqual(newToken, _token.current))
                        {
                            _token.current = newToken;
                            action(newToken);
                        }
                    },
                    complete: _cleanup,
                    error: (err: Error) => errorHandler(err, mergedOptions)
                };

                _subscription.current = _observable.current
                    .pipe(switchMap(() => from(_getToken(spList))))
                    .subscribe(observer);
            }
        }

        _innerState.current = {
            externalDependencies: deps,
            interval: interval,
            list: list,
            webOptions: webOption
        };

    }, [options, list, interval, globalOptions, deps, _cleanup, action]);
}

const _getToken = async (list: IList): Promise<ChangeTokenInfo> =>
{
    const listInfo = await list();

    return {
        CurrentChangeToken: listInfo.CurrentChangeToken,
        Id: listInfo.Id,
        LastItemDeletedDate: listInfo.LastItemDeletedDate,
        LastItemModifiedDate: listInfo.LastItemModifiedDate,
        LastItemUserModifiedDate: listInfo.LastItemUserModifiedDate,
    };
};

interface TrackedState
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    list: Nullable<string>;
    interval: Nullable<number>;
}