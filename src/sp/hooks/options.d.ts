import type { IChangeQuery } from "@pnp/sp/types.js";
import type {
  BehaviourOptions,
  ContextOptions,
  DisableOptionValueType,
  ErrorOptions,
  RenderOptions,
} from "../../types.js";
import type {
  FilteredODataQueryable,
  ODataQueryable,
  ODataQueryableCollection,
  PnpHookOptions,
  RenderListDataOverrideParameters,
  Scope,
} from "../types.js";
import type { IClientPeoplePickerQueryParameters } from "@pnp/sp/profiles";
import type { IRenderListDataParameters } from "@pnp/sp/lists";
import type { PermissionKind } from "@pnp/sp/security";
import type { RoleTypeKind } from "@pnp/sp/security/types.js";
import type { ISearchQuery } from "@pnp/sp/search";

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

export interface SearchUserOptions
  extends RenderOptions,
    ErrorOptions,
    BehaviourOptions,
    ContextOptions {
  disabled?:
    | DisableOptionValueType
    | { (searchOptions: IClientPeoplePickerQueryParameters | string): boolean };
}

export interface GroupUsersOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

export interface NavigationOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * Navigation type. Default is 'topNavigation'. Changing the type
   * resends request.
   */
  type?: NavigationTypes;
}

export interface IsMemberOfOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  /**
   * User email, login name or Id. Default is current user.
   * Changing userId resends request.
   */
  userId?: string | number;

  disabled?: DisableOptionValueType | { (groupId: string | number): boolean };
}

export type CurrentUserInfoOptions = PnpHookOptions<ODataQueryable>;

export interface ItemAttachmentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

export interface ItemCommentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?:
    | DisableOptionValueType
    | { (itemId: number, list: string): boolean };
}

export interface RenderListParameters {
  dataParameters: IRenderListDataParameters;
  dataOverrideParameters?: RenderListDataOverrideParameters;

  /** Pass override parameters as query string. */
  useQueryParameters?: boolean;
}

export interface ListAsStreamOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  disabled?:
    | DisableOptionValueType
    | { (list: string, parameters: RenderListParameters): boolean };
}

export interface PageCommentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  disabled?: DisableOptionValueType | { (pageRelativePath: string): boolean };
}

export interface ItemContentTypeOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List GUID Id or title for getting list changes. Keep undefined for web changes.
   * Changing list value resends request.
   */
  list?: string;
}

export interface UserPermissionOptions
  extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  /**
   * User email, login name or Id. Default is current user.
   * Changing userId resends request.
   */
  userId?: string | number;

  /**
   * List and list item scope configuration. Default is current web scope.
   */
  scope?: Scope;
  disabled?:
    | DisableOptionValueType
    | {
        (
          permissionKinds: PermissionKind[] | PermissionKind,
          userId: string | number,
        ): boolean;
      };
}

export type WebPropertiesOptions = PnpHookOptions<ODataQueryable>;

export interface RoleType {
  roleType: RoleTypeKind;
}

export interface RoleDefinitionOptions extends PnpHookOptions<ODataQueryable> {
  disabled?:
    | DisableOptionValueType
    | { (roleDefId: string | number | RoleType): boolean };
}

export interface RecycleBinItemOptions extends PnpHookOptions<ODataQueryable> {
  scope?: RecycleBinScopes;
  disabled?: DisableOptionValueType | { (itemId: string): boolean };
}

export interface RecycleBinItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  scope?: RecycleBinScopes;
}

export type RegionalSettingOptions = PnpHookOptions<ODataQueryable>;

export interface RoleAssignmentsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  /**
   * List and list item scope configuration. Default is current web scope.
   */
  scope?: Scope;
}

export type RoleDefinitionsOptions = PnpHookOptions<ODataQueryableCollection>;

export interface ListTokenOptions
  extends ErrorOptions,
    ContextOptions,
    BehaviourOptions {
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export type ItemRequestOptionTypes = 0 | 1 | 2;

export interface BaseListItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  mode?: ItemRequestOptionTypes;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface ListItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  mode?: 0;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

/**
 * @deprecated Last resort option. 99.99% times you should avoid this option.
 */
export interface AllItemsOptions
  extends PnpHookOptions<FilteredODataQueryable> {
  mode: 1;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface PagedItemsOptions
  extends PnpHookOptions<ODataQueryableCollection> {
  mode?: 2;
  disabled?: DisableOptionValueType | { (list: string): boolean };
}

export interface SearchOptions
  extends RenderOptions,
    ErrorOptions,
    BehaviourOptions,
    ContextOptions {
  disabled?:
    | DisableOptionValueType
    | { (searchOptions: ISearchQuery | string): boolean };
}
