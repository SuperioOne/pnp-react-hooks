import "@pnp/sp/files";
import "@pnp/sp/folders";
import {
  BehaviourOptions,
  ContextOptions,
  ErrorOptions,
  RenderOptions,
} from "../../types";
import { DisableOptionType, DisableOptionValueType } from "../../types";
import { FilteredODataQueryable, ODataQueryableCollection } from "../types";
import { IFileInfo } from "@pnp/sp/files/types";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { InternalContext } from "../../context";
import { assert, assertString } from "../../utils/assert";
import { compareTuples, compareURL } from "../../utils/compare";
import { deepCompareQuery } from "../deepCompare";
import { defaultCheckDisable, checkDisable } from "../checkDisable";
import { errorHandler } from "../errorHandler";
import { insertODataQuery } from "../insertODataQuery";
import { isNull, isUrl, UrlType } from "../../utils/is";
import { mergeOptions } from "../merge";
import { resolveSP } from "../resolveSP";
import { useCallback, useRef, useEffect, useContext, useReducer } from "react";
import { shallowEqual } from "../../utils/compare";

export interface FolderTreeOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  /**
   * OData query options for files. Changing the value resends request.
   */
  fileQuery?: ODataQueryableCollection;

  /**
   * Folder filter query. Changing the value resends request.
   */
  folderFilter?: string;
  disabled?:
    | DisableOptionValueType
    | { (rootFolderRelativeUrl: string): boolean };
}

/**
 * Returns a tree like structure from specified root folder.
 * @param rootFolderRelativePath Root folder server relative path
 * @param options PnP hook paths
 * @param deps useFolderTree refreshes response data when one of the dependencies changes.
 */
export function useFolderTree(
  rootFolderRelativePath: string,
  options?: FolderTreeOptions,
  deps?: React.DependencyList,
): TreeContext | null | undefined {
  const [state, _dispatch] = useReducer(_reducer, {
    currentFolderPath: rootFolderRelativePath,
    initialUrl: rootFolderRelativePath,
  });

  const globalOptions = useContext(InternalContext);

  const _innerState = useRef<TrackedState>({
    externalDependencies: null,
    fileQuery: null,
    folderPath: null,
    folderFilter: null,
    initialPath: rootFolderRelativePath,
    options: null,
  });

  const _disabled = useRef<DisableOptionType | undefined>(options?.disabled);
  const _timer = useRef<number | NodeJS.Timeout | undefined>(undefined);

  // dispatch proxy for disabling callbacks. Prevents any state change when hook is disabled.
  const dispatch = useCallback((action: TreeAction) => {
    if (_disabled.current !== true) {
      _dispatch(action);
    } else {
      console.warn(
        "useFolderTree hook is disabled. Callback will not change any state.",
      );
    }
  }, []);

  const _cleanup = useCallback(() => {
    if (_timer.current !== undefined) {
      clearTimeout(_timer.current);
      _timer.current = undefined;
    }
  }, []);

  useEffect(() => _cleanup, [_cleanup]);

  useEffect(() => {
    const mergedOptions = mergeOptions(globalOptions, options);
    _disabled.current = checkDisable(
      mergedOptions.disabled,
      defaultCheckDisable,
      rootFolderRelativePath,
    );

    if (_disabled.current !== true) {
      const fileQuery = options?.fileQuery;
      const folderFilter = options?.folderFilter;

      // reset hook state when web or root path changed
      if (_innerState.current.initialPath !== rootFolderRelativePath) {
        // prevent path change in case of similar urls (ex: "/EXAMPLE" and "/example/")
        if (
          isNull(_innerState.current.initialPath) ||
          isNull(rootFolderRelativePath) ||
          !compareURL(_innerState.current.initialPath, rootFolderRelativePath)
        ) {
          dispatch({
            type: ActionTypes.ChangePath,
            callback: undefined,
            initialUrl: rootFolderRelativePath,
            currentFolderPath: rootFolderRelativePath,
            treeContext: undefined,
          });
        }
      } else {
        const path = state.currentFolderPath;

        const shouldUpdate =
          path?.toLowerCase() !==
            _innerState.current.folderPath?.toLowerCase() ||
          _innerState.current.folderFilter !== folderFilter ||
          !deepCompareQuery(_innerState.current.fileQuery, fileQuery) ||
          !shallowEqual(_innerState.current.options?.sp, mergedOptions?.sp) ||
          !compareTuples(_innerState.current.externalDependencies, deps);

        if (shouldUpdate) {
          try {
            assert(
              typeof path === "string" && isUrl(path, UrlType.Relative),
              "path value is not valid",
            );

            _cleanup();

            if (mergedOptions?.keepPreviousState !== true) {
              dispatch({ type: ActionTypes.Reset, resetValue: undefined });
            }

            const sp = resolveSP(mergedOptions);
            const rootFolder = sp.web.getFolderByServerRelativePath(path);

            const getFolderTree = async (): Promise<TreeContext> => {
              assertString(path, "Path value is empty or null.");
              assertString(
                state.initialUrl,
                "Home path value is empty or null.",
              );

              const filesReq = insertODataQuery(rootFolder.files, fileQuery);
              const subFolderReq = rootFolder.folders;
              const isRoot = compareURL(path, state.initialUrl);

              if (folderFilter) {
                subFolderReq.filter(folderFilter);
              }

              const [files, subFolders, rootInfo, parentPath] =
                await Promise.all([
                  filesReq(),
                  subFolderReq(),
                  rootFolder(),
                  isRoot
                    ? undefined
                    : rootFolder.parentFolder.select("ServerRelativeUrl")(),
                ]);

              let upCallback: RootChangeCallback | undefined = undefined;

              if (!isRoot) {
                upCallback = (c) =>
                  dispatch({
                    type: ActionTypes.ChangePath,
                    callback: c,
                    currentFolderPath: parentPath?.ServerRelativeUrl,
                  });
              }

              return {
                files: files,
                folders: subFolders.map((f) => ({
                  ...f,
                  setAsRoot: (c) =>
                    dispatch({
                      type: ActionTypes.ChangePath,
                      currentFolderPath: f.ServerRelativeUrl,
                      callback: c,
                    }),
                })),
                root: rootInfo,
                home: (c) =>
                  dispatch({
                    type: ActionTypes.ChangePath,
                    callback: c,
                    currentFolderPath: state.initialUrl,
                  }),
                up: upCallback,
              };
            };

            _timer.current = setTimeout(async () => {
              try {
                const tree = await getFolderTree();
                dispatch({
                  type: ActionTypes.NewTreeResult,
                  context: tree,
                  currentPath: path,
                });
                state.callback?.();
              } catch (err) {
                dispatch({ type: ActionTypes.Reset, resetValue: null });
                errorHandler(err, mergedOptions);
              }
            });
          } catch (err) {
            errorHandler(err, mergedOptions);
          }
        }
      }

      _innerState.current = {
        externalDependencies: deps,
        fileQuery: fileQuery,
        folderPath: state.currentFolderPath,
        folderFilter: folderFilter,
        initialPath: rootFolderRelativePath,
        options: mergedOptions,
      };
    }
  }, [
    state,
    rootFolderRelativePath,
    options,
    globalOptions,
    deps,
    _cleanup,
    dispatch,
  ]);

  return state.treeContext;
}

const _reducer = (state: FolderState, action: TreeAction): FolderState => {
  switch (action.type) {
    case ActionTypes.Reset:
      return {
        ...state,
        treeContext: action.resetValue,
      };
    case ActionTypes.NewTreeResult:
      return {
        initialUrl: state.initialUrl,
        callback: undefined,
        currentFolderPath: action.currentPath,
        treeContext: action.context,
      };
    case ActionTypes.ChangePath:
      return {
        ...state,
        ...action,
        currentFolderPath: action.currentFolderPath,
      };
    default:
      throw new Error(`useSearch: Unexpected action type received.`);
  }
};

interface FolderState {
  initialUrl: string | null | undefined;
  currentFolderPath: string | null | undefined;
  callback?: () => void;
  treeContext?: TreeContext | null | undefined;
}

interface TrackedState {
  folderPath: string | null | undefined;
  options: ContextOptions | null | undefined;
  externalDependencies: React.DependencyList | null | undefined;
  folderFilter: string | null | undefined;
  fileQuery: FilteredODataQueryable | null | undefined;
  initialPath: string | null | undefined;
}

export interface IFolderNode extends IFolderInfo {
  /**
   * Set folder as current folder.
   */
  setAsRoot: RootChangeCallback;
}

export interface TreeContext {
  /**
   * Folder info collection for the current folder.
   */
  folders: IFolderNode[];

  /**
   * File info collection for the current folder.
   */
  files: IFileInfo[];

  /**
   * Current folder information.
   */
  root?: IFolderInfo;

  /**
   * Set current path to the parent folder's path.
   */
  up?: RootChangeCallback;

  /**
   * Set current path to home.
   */
  home: RootChangeCallback;
}

type RootChangeCallback = (callback?: () => void) => void;

enum ActionTypes {
  ChangePath = 1,
  NewTreeResult = 2,
  Reset = 3,
}

interface Action<T extends ActionTypes> {
  type: T;
}

interface ResetAction extends Action<ActionTypes.Reset> {
  resetValue?: null | undefined;
}

interface NewTreeResultAction extends Action<ActionTypes.NewTreeResult> {
  currentPath: string | null | undefined;
  context: TreeContext;
}

interface ChangePathAction
  extends Action<ActionTypes.ChangePath>,
    Partial<FolderState> {
  currentFolderPath: string | null | undefined;
}

type TreeAction = ResetAction | ChangePathAction | NewTreeResultAction;
