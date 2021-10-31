import { useCallback, useEffect, useRef, useContext } from "react";
import { shallowEqual } from "../utils/shallowEqual";
import { resolveWeb } from "../utils/resolveWeb";
import { resolveList } from "../utils/resolveList";
import { isReactDependencyList } from "../utils/typeGuards";
import { errorHandler } from "../utils/errorHandler";
import { compareTuples } from "../utils/compareTuples";
import { WebOptions, ExceptionOptions } from "../types/options";
import { Nullable } from "../types/utilityTypes";
import { NextObserver, Subscription, Observable, from, timer, share, exhaustMap } from "rxjs";
import { InternalContext } from "../context";
import { IWeb } from "@pnp/sp/webs/types";
import { IList } from "@pnp/sp/lists/types";
import { IChangeTokenInfo, ChangeTokenInfo } from "../types/ChangeTokenInfo";

const DEFAULT_INTERVAL = 60000;

export interface ListChangeOptions extends WebOptions, ExceptionOptions
{
    disabled?: boolean;
    interval?: number;
}

export function useListChangeEffect(
    list: string,
    action: (token: IChangeTokenInfo) => void,
    deps?: React.DependencyList): void;

export function useListChangeEffect(
    list: string,
    action: (token: IChangeTokenInfo) => void,
    options: ListChangeOptions,
    deps?: React.DependencyList): void;

export function useListChangeEffect(
    list: string,
    action: (token: IChangeTokenInfo) => void,
    pOptions?: ListChangeOptions | React.DependencyList,
    pDeps?: React.DependencyList): void
{
    const globalOptions = useContext(InternalContext);

    const _token = useRef<IChangeTokenInfo>();
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
        let webOption: string | IWeb | undefined;
        let interval: number | undefined;
        let options: ListChangeOptions | undefined;
        let deps: React.DependencyList | undefined;

        if (isReactDependencyList(pOptions))
        {
            deps = pOptions;
            options = undefined;
        }
        else
        {
            deps = pDeps;
            options = pOptions;
        }

        if (options?.disabled === true)
        {
            _cleanup();
        }
        else
        {
            webOption = options?.web ?? globalOptions?.web;
            interval = options?.interval ?? DEFAULT_INTERVAL;

            const shouldUpdate = !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, webOption)
                || _innerState.current.interval !== interval
                || _innerState.current.list !== list;

            if (shouldUpdate)
            {
                const mergedOptions = options
                    ? { ...globalOptions, ...options }
                    : globalOptions;

                try
                {
                    const web = resolveWeb(mergedOptions);
                    const spList = resolveList(web, list)
                        .select(
                            "CurrentChangeToken",
                            "ID",
                            "LastItemDeletedDate",
                            "LastItemModifiedDate",
                            "LastItemUserModifiedDate");


                    const observer: NextObserver<IChangeTokenInfo> = {
                        next: (newToken) =>
                        {
                            if (!shallowEqual(newToken?.LastChanges, _token.current?.LastChanges))
                            {
                                _token.current = newToken;
                                action(newToken);
                            }
                        },
                        complete: _cleanup,
                        error: (err: Error) => errorHandler(err, mergedOptions)
                    };

                    // if observable is null or interval is changed register a new one.
                    if (!_observable.current || _innerState.current.interval !== interval)
                        _observable.current = timer(1, interval);

                    const newSubscription = _observable.current
                        .pipe(
                            exhaustMap(() => from(_getToken(spList))),
                            share()
                        )
                        .subscribe(observer);

                    _cleanup();
                    _subscription.current = newSubscription;
                }
                catch (err)
                {
                    errorHandler(err, mergedOptions);
                }
            }
        }

        _innerState.current = {
            externalDependencies: deps,
            interval: interval,
            list: list,
            webOptions: webOption
        };

    }, [action, pOptions, list, pDeps, globalOptions, _cleanup]);
}

const _getToken = async (list: IList): Promise<IChangeTokenInfo> =>
{
    const listInfo = await list();

    return new ChangeTokenInfo(listInfo);
};

interface TrackedState
{
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    list: Nullable<string>;
    interval: Nullable<number>;
}