import type { IChangeQuery } from "@pnp/sp/types";
import type {
  BehaviourOptions,
  ContextOptions,
  DisableOptionValueType,
  ErrorOptions,
  RenderOptions,
} from "../../types";
import type {
  ODataQueryable,
  ODataQueryableCollection,
  PnpHookOptions,
} from "../types";

export type AppCatalogScopes = "tenant" | "siteCollection";
export type FileReturnTypes = "blob" | "buffer" | "text" | "info";
export type NavigationTypes = "topNavigation" | "quickLaunch";
export type FeatureScopes = "web" | "site";
export type RecycleBinScopes = "web" | "site";

export interface WebAppOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (appId: string): boolean };
  scope?: AppCatalogScopes;
}

export interface WebAppsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  scope?: AppCatalogScopes;
}

export interface _BaseFileOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * Return type. Changing type resends request.
   */
  type?: FileReturnTypes;
  disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

export interface FileInfoOptions extends _BaseFileOptions {
  type?: "info" | undefined;
}

export interface FileTextOptions extends Omit<_BaseFileOptions, "query"> {
  type: "text";
}

export interface FileBufferOptions extends Omit<_BaseFileOptions, "query"> {
  type: "buffer";
}

export interface FileBlobOptions extends Omit<_BaseFileOptions, "query"> {
  type: "blob";
}

export type SiteInfoOptions = PnpHookOptions<ODataQueryable>;

export interface ViewOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (listId: string, viewId?: string): boolean };
}

export interface ListOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface UserOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (userId: number | string): boolean };
}

export interface FieldOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * List GUID Id or title for getting list field. Keep undefined for web field.
   * Changing list value resends request.
   */
  list?: string;
  disabled?: DisableOptionValueType | { (fieldId: string): boolean };
}

export type ListsOptions = PnpHookOptions<ODataQueryableCollection>;

export interface GroupOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

export interface ViewsOptions extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (listId: string): boolean };
}

export interface FilesOptions extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (folderId: string): boolean };
}

export interface FieldsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List GUID Id or title for getting list fields. Keep undefined for web fields.
   * Changing list value resends request.
   */
  list?: string;
}

export interface FolderOptions extends PnpHookOptions<ODataQueryable> {
  disabled?: DisableOptionValueType | { (fileId: string): boolean };
}

export interface GroupsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * User email, login name or Id. Default is web site groups.
   * Changing userId resends request.
   */
  userId?: string | number;
}

export type WebInfoOptions = PnpHookOptions<ODataQueryable>;

export interface ProfileOptions
  extends ErrorOptions,
    RenderOptions,
    BehaviourOptions,
    ContextOptions {
  disabled?: DisableOptionValueType | { (loginName: string): boolean };
}

export interface ChangesOptions
  extends RenderOptions,
    ContextOptions,
    ErrorOptions,
    BehaviourOptions {
  /**
   * List GUID Id or title for getting list changes. Keep undefined for web changes.
   * Changing list value resends request.
   */
  list?: string;
  disabled?: DisableOptionValueType | { (changeQuery: IChangeQuery): boolean };
}

export type SubWebsOptions = PnpHookOptions<ODataQueryableCollection>;

export interface FoldersOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * Root folder GUID Id or server relative path.
   * Changing root folder resends request.
   */
  rootFolderId?: string;
  disabled?: DisableOptionValueType | { (): boolean };
}

export interface FeaturesOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * Feature scope. Available options are 'site' and 'web'.
   * Changing scope type resends request.
   * @default "web"
   */
  scope?: FeatureScopes;
}

export interface ListItemOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

export type SiteUsersOptions = PnpHookOptions<ODataQueryableCollection>;

export interface GroupUserOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (groupId: string | number, userId: string | number): boolean };
}

export interface BaseAttachmentOptions extends PnpHookOptions<ODataQueryable> {
  /**
   * Return type
   */
  type?: FileReturnTypes;
  disabled?:
    | DisableOptionValueType
    | { (attachmentName: string, itemId: number, list: string): boolean };
}

export interface AttachmentInfoOptions extends BaseAttachmentOptions {
  type?: "info" | undefined;
}

export interface AttachmentTextOptions
  extends Omit<BaseAttachmentOptions, "query"> {
  type: "text";
}

export interface AttachmentBufferOptions
  extends Omit<BaseAttachmentOptions, "query"> {
  type: "buffer";
}

export interface AttachmentBlobOptions
  extends Omit<BaseAttachmentOptions, "query"> {
  type: "blob";
}
