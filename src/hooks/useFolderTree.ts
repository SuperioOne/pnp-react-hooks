import "@pnp/sp/files";
import "@pnp/sp/folders";
import { DisableOptionType, DisableOptionValueType } from "../types/options/RenderOptions";
import { ExceptionOptions, RenderOptions, WebOptions, CacheOptions, LoadActionMode } from "../types/options";
import { FilteredODataQueryable, ODataQueryableCollection } from "../types/ODataQueryable";
import { IFileInfo } from "@pnp/sp/files/types";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { Nullable } from "../types/utilityTypes";
import { assert, assertString } from "../utils/assert";
import { compareTuples } from "../utils/compareTuples";
import { compareURL } from "../utils/compareURL";
import { deepCompareQuery } from "../utils/deepCompareQuery";
import { defaultCheckDisable, checkDisable } from "../utils/checkDisable";
import { errorHandler } from "../utils/errorHandler";
import { from, NextObserver, Subscription } from "rxjs";
import { insertCacheOptions } from "../utils/insertCacheOptions";
import { insertODataQuery } from "../utils/insertODataQuery";
import { isUrl, UrlType } from "../utils/isUrl";
import { mergeOptions } from "../utils/merge";
import { resolveWeb } from "../utils/resolveWeb";
import { shallowEqual } from "../utils/shallowEqual";
import { useCallback, useRef, useEffect, useContext, useReducer } from "react";
import { isNull } from "../utils/isNull";

export interface FolderTreeOptions extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    fileQuery?: ODataQueryableCollection;
    folderFilter?: string;
    useCache?: undefined | boolean;
    disabled?: DisableOptionValueType | { (rootFolderRelativeUrl: string): boolean };
}

export function useFolderTree(
    rootFolderRelativeUrl: string,
    options?: FolderTreeOptions,
    deps?: React.DependencyList): Nullable<TreeContext>
{
    const [state, _dispatch] = useReducer(_reducer, {
        currentFolderUrl: rootFolderRelativeUrl,
        initialUrl: rootFolderRelativeUrl
    });

    const globalOptions = useContext(InternalContext);

    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        fileQuery: null,
        folderUrl: null,
        folderFilter: null,
        initialUrl: rootFolderRelativeUrl,
        webOptions: null
    });

    const _disabled = useRef<DisableOptionType | undefined>(options?.disabled);
    const _subscription = useRef<Nullable<Subscription>>(undefined);

    // dispatch proxy for disabling callbacks. Prevents any state change when hook is disabled.
    const dispatch = useCallback((action: TreeAction) =>
    {
        if (_disabled.current !== true)
        {
            _dispatch(action);
        }
        else
        {
            console.warn("useFolderTree hook is disabled. Callback will not change any state.");
        }
    }, []);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        const mergedOptions = mergeOptions(globalOptions, options);
        _disabled.current = checkDisable(mergedOptions.disabled, defaultCheckDisable, rootFolderRelativeUrl);

        if (_disabled.current !== true)
        {
            const fileQuery = options?.fileQuery;
            const folderFilter = options?.folderFilter;

            // reset hook state when web or root path changed 
            if (_innerState.current.initialUrl !== rootFolderRelativeUrl)
            {
                // prevent path change in case of similar urls (ex: "/EXAMPLE" and "/example/")
                if (isNull(_innerState.current.initialUrl)
                    || isNull(rootFolderRelativeUrl)
                    || !compareURL(_innerState.current.initialUrl, rootFolderRelativeUrl))
                {
                    dispatch({
                        type: ActionTypes.ChangePath,
                        callback: undefined,
                        initialUrl: rootFolderRelativeUrl,
                        currentFolderUrl: rootFolderRelativeUrl,
                        treeContext: undefined
                    });
                }
            }
            else
            {
                const path = state.currentFolderUrl;

                const shouldUpdate = path?.toLowerCase() !== _innerState.current.folderUrl?.toLowerCase()
                    || _innerState.current.folderFilter !== folderFilter
                    || !deepCompareQuery(_innerState.current.fileQuery, fileQuery)
                    || !shallowEqual(_innerState.current.webOptions, mergedOptions.web)
                    || !compareTuples(_innerState.current.externalDependencies, deps);

                if (shouldUpdate)
                {
                    try
                    {
                        assert(typeof path === "string" && isUrl(path, UrlType.Relative), "path value is not valid");

                        _cleanup();

                        if (mergedOptions?.loadActionOption !== LoadActionMode.KeepPrevious)
                        {
                            dispatch({ type: ActionTypes.Reset, resetValue: undefined });
                        }

                        const observer: NextObserver<TreeContext> = {
                            next: (tree) =>
                            {
                                dispatch({ type: ActionTypes.NewTreeResult, context: tree, currentPath: path });
                                state.callback?.();
                            },
                            complete: _cleanup,
                            error: (err: Error) =>
                            {
                                dispatch({ type: ActionTypes.Reset, resetValue: null });
                                errorHandler(err, mergedOptions);
                            }
                        };

                        const web = resolveWeb(mergedOptions);
                        const rootFolder = web.getFolderByServerRelativePath(path);

                        const getFolderTree = async (): Promise<TreeContext> =>
                        {
                            assertString(path, "Path value is empty or null.");
                            assertString(state.initialUrl, "Home path value is empty or null.");

                            const filesReq = insertODataQuery(rootFolder.files, fileQuery);
                            const subFolderReq = rootFolder.folders;
                            const isRootCall = compareURL(path, state.initialUrl);

                            if (folderFilter)
                            {
                                subFolderReq.filter(folderFilter);
                            }

                            insertCacheOptions(filesReq, mergedOptions);
                            insertCacheOptions(subFolderReq, mergedOptions);
                            insertCacheOptions(rootFolder, mergedOptions);

                            const [files, subFolders, rootInfo, parentPath] = await Promise.all([

                                filesReq.get(),
                                subFolderReq.get(),
                                rootFolder.get(),
                                isRootCall ? undefined : rootFolder.parentFolder.serverRelativeUrl.get()
                            ]);

                            let upCallback: RootChangeCallback | undefined = undefined;

                            if (!isRootCall)
                            {
                                upCallback = (c) => dispatch({
                                    type: ActionTypes.ChangePath,
                                    callback: c,
                                    currentFolderUrl: parentPath
                                });
                            }

                            return {
                                files: files,
                                folders: subFolders.map(f => ({
                                    ...f,
                                    setAsRoot: (c) => dispatch({
                                        type: ActionTypes.ChangePath,
                                        currentFolderUrl: f.ServerRelativeUrl,
                                        callback: c
                                    })
                                })),
                                root: rootInfo,
                                home: (c) => dispatch({
                                    type: ActionTypes.ChangePath,
                                    callback: c,
                                    currentFolderUrl: state.initialUrl
                                }),
                                up: upCallback,
                            };
                        };

                        _subscription.current = from(getFolderTree())
                            .subscribe(observer);
                    }
                    catch (err)
                    {
                        errorHandler(err, mergedOptions);
                    }
                }
            }

            _innerState.current = {
                externalDependencies: deps,
                fileQuery: fileQuery,
                folderUrl: state.currentFolderUrl,
                folderFilter: folderFilter,
                initialUrl: rootFolderRelativeUrl,
                webOptions: mergedOptions.web
            };
        }
    }, [state, rootFolderRelativeUrl, options, globalOptions, deps, _cleanup, dispatch]);

    return state.treeContext;
}

const _reducer = (state: FolderState, action: TreeAction): FolderState => 
{
    switch (action.type)
    {
        case ActionTypes.Reset:
            return {
                ...state,
                treeContext: action.resetValue
            };
        case ActionTypes.NewTreeResult:
            return {
                initialUrl: state.initialUrl,
                callback: undefined,
                currentFolderUrl: action.currentPath,
                treeContext: action.context
            };
        case ActionTypes.ChangePath:
            return {
                ...state,
                ...action,
                currentFolderUrl: action.currentFolderUrl,
            };
        default:
            throw new Error(`useSearch: Unexpected action type received.`);
    }
};

interface FolderState
{
    initialUrl: Nullable<string>;
    currentFolderUrl: Nullable<string>;
    callback?: () => void;
    treeContext?: Nullable<TreeContext>;
}

interface TrackedState
{
    folderUrl: Nullable<string>,
    webOptions: Nullable<IWeb | string>;
    externalDependencies: Nullable<React.DependencyList>
    folderFilter: Nullable<string>;
    fileQuery: Nullable<FilteredODataQueryable>;
    initialUrl: Nullable<string>;
}

interface IFolderNode extends IFolderInfo
{
    setAsRoot: RootChangeCallback;
}

interface TreeContext
{
    folders: IFolderNode[];
    files: IFileInfo[];
    root?: IFolderInfo;
    up?: RootChangeCallback;
    home: RootChangeCallback;
}

type RootChangeCallback = (callback?: () => void) => void;

enum ActionTypes
{
    ChangePath = 1,
    NewTreeResult = 2,
    Reset = 3
}

interface Action<T extends ActionTypes>
{
    type: T;
}

interface ResetAction extends Action<ActionTypes.Reset>
{
    resetValue?: null | undefined;
}

interface NewTreeResultAction extends Action<ActionTypes.NewTreeResult>
{
    currentPath: Nullable<string>;
    context: TreeContext;
}

interface ChangePathAction extends Action<ActionTypes.ChangePath>, Partial<FolderState>
{
    currentFolderUrl: Nullable<string>;
}

type TreeAction = ResetAction | ChangePathAction | NewTreeResultAction;