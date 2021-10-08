import "@pnp/sp/files";
import "@pnp/sp/folders";
import { CacheOptions, ExceptionOptions, FilteredODataQueryable, LoadActionMode, Nullable, RenderOptions, WebOptions } from "../types";
import { IFileInfo } from "@pnp/sp/files/types";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { IWeb } from "@pnp/sp/webs/types";
import { InternalContext } from "../context";
import { assert, assertString, compareTuples, compareURL, deepCompareQuery, errorHandler, insertCacheOptions, insertODataQuery, isUrl, resolveWeb, shallowEqual, UrlType } from "../utils";
import { from, NextObserver, Subscription } from "rxjs";
import { useCallback, useRef, useEffect, useContext, useReducer } from "react";

export interface FolderTreeOptions extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    fileQuery?: FilteredODataQueryable;
    folderFilter?: string;
    useCache?: undefined | boolean;
}

export function useFolderTree(
    rootFolderUrl: string,
    options?: FolderTreeOptions,
    deps?: React.DependencyList): Nullable<TreeContext>
{
    const [state, dispatch] = useReducer(_reducer, { currentFolderUrl: rootFolderUrl });

    const globalOptions = useContext(InternalContext);

    const _innerState = useRef<TrackedState>({
        externalDependencies: null,
        fileQuery: null,
        folderUrl: null,
        folderFilter: null,
        initialRootUrl: null,
        webOptions: null
    });

    const _subscription = useRef<Nullable<Subscription>>(undefined);

    const _cleanup = useCallback(() =>
    {
        _subscription.current?.unsubscribe();
        _subscription.current = undefined;
    }, []);

    useEffect(() => _cleanup, [_cleanup]);

    useEffect(() =>
    {
        setTimeout(() =>
        {
            const fileQuery = options?.fileQuery;
            const folderFilter = options?.folderFilter;
            const webOption = options?.web ?? globalOptions?.web;
            let path = state.currentFolderUrl;

            const shouldUpdate = state.currentFolderUrl !== _innerState.current.folderUrl
                || _innerState.current.initialRootUrl !== rootFolderUrl
                || _innerState.current.folderFilter !== folderFilter
                || !deepCompareQuery(_innerState.current.fileQuery, fileQuery)
                || !compareTuples(_innerState.current.externalDependencies, deps)
                || !shallowEqual(_innerState.current.webOptions, webOption);

            if (shouldUpdate)
            {
                const mergedOptions = options
                    ? { ...globalOptions, ...options }
                    : globalOptions;

                try
                {
                    // reset to home path if some state changed but current root path is still same
                    if (state.currentFolderUrl === _innerState.current.folderUrl)
                    {
                        path = rootFolderUrl;
                    }

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

                        const filesReq = insertODataQuery(rootFolder.files, fileQuery);
                        const subFolderReq = rootFolder.folders;
                        const isRootCall = compareURL(path, rootFolderUrl);

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
                                path: parentPath
                            });
                        }

                        return {
                            files: files,
                            folders: subFolders.map(f => ({
                                ...f,
                                setAsRoot: (c) => dispatch({
                                    type: ActionTypes.ChangePath,
                                    path: f.ServerRelativeUrl,
                                    callback: c
                                })
                            })),
                            root: rootInfo,
                            home: (c) => dispatch({
                                type: ActionTypes.ChangePath,
                                callback: c,
                                path: rootFolderUrl
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

            _innerState.current = {
                externalDependencies: deps,
                fileQuery: fileQuery,
                folderUrl: path,
                folderFilter: folderFilter,
                initialRootUrl: rootFolderUrl,
                webOptions: webOption
            };
        }, 0);
    });

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
                callback: undefined,
                currentFolderUrl: action.currentPath?.toLowerCase(),
                treeContext: action.context
            };
        case ActionTypes.ChangePath:
            return {
                ...state,
                currentFolderUrl: action.path?.toLowerCase(),
                callback: action.callback,
            };
        default:
            throw new Error(`useSearch: Unexpected action type received.`);
    }
};

interface FolderState
{
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
    initialRootUrl: Nullable<string>;
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

interface ChangePathAction extends Action<ActionTypes.ChangePath>
{
    path: Nullable<string>;
    callback?: () => void;
}

type TreeAction = ResetAction | ChangePathAction | NewTreeResultAction;