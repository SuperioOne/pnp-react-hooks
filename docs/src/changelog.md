# CHANGELOG

## v2.0.0 - The Wheelwright
-----------------------------------
*Aug 04, 2024*

### Changed

- Minimum supported `@pnp/sp` peer dependency versions has been bumped to `^4.1.0`.
- The library now support React versions between `16.9.0` and `^18.0.0`.
- `useSearch`, `useUserSearch`, `useChanges` object queries are no longer automatically tracked internally. Instead, developers must use the custom dependency list for reactivity just like any other React hooks.
- Migrated from TypeScript to JavaScript with JSDoc typings, but library still provides type definition files.
- Migrated from jest to vitest.
- All dependencies have been updated to their latest versions.
- `useSearch` and paged `useListItems` now provide data as argument on dispatch callbacks.
- v1's [Docusaurus repo](https://github.com/SuperioOne/pnp-react-hooks-docs) has been archived, v2 docs are moved to the main repo.
- In `useListItems` paged mode, the `hasNext` value is inverted to match with the async iterators `done` property.

### Removed

- `useFolderTree` hook.
- RxJs and tslib dependencies have been deleted.

## v1.3.0
-----------------------------------
*Apr 22, 2023*

### Added

- Site collection and tenant scope option for `useApp` and `useApps` hooks.

### Changed

- Minimum supported `@pnp/sp` peer dependency version bumped to `^3.14.0`

## v1.2.0
-----------------------------------
*Dec 28, 2022*

### Added

- `useRecycleBinItem` and `useRecycleBinItems` hooks.
- `createProviderElement` helper function for simplifiying SPFx initialization.

### Fixed

- `useSearch` hook incorrectly overrides RowLimit when `getPageDispatch` is called.

## v1.1.0 
-----------------------------------
*May 18, 2022*

### Added

- `useListItems` paged request option.
- `useView` and `useViews` hooks.
- `useListAsStream` hook.
- `FetchWithAbort` behavior for cancelling fetch requests.

### Fixed

- `useSearch` initiates double query issue.

## v1.0.1
-----------------------------------
*March 11, 2022*

### Fixed

- `useSearch` throwing error when `getPageDispatch` called more than one.

## v1.0.0
-----------------------------------
*March 09, 2022*

Initial release

