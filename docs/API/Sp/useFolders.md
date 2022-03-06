[API](../index.md) / [Sp](../index.md#sp) / useFolders

## Definition

▸ **useFolders**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IFolderInfo`[]\>

Returns folders from root. Use [`FoldersOptions.rootFolderId`](../Interfaces/FoldersOptions.md#rootfolderid) property to change root.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`FoldersOptions`](../Interfaces/FoldersOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFolders will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IFolderInfo`[]\>

## Examples

```typescript
// get folders from web's root folder
const rootFolders = useFolders();

// get folders from specific folder
const folders = useFolders({
	rootFolderId: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});

// get folders from specific folder
const siteAssetsFolders = useFolders({
	rootFolderId: "/sites/mysite/SiteAssets"
});

// get folders from specific folder
const filteredFolders = useFolders({
	rootFolderId: "/sites/mysite/SiteAssets",
	query:{
		select: ["Id", "Title"],
		filter: "substringof('Test', Title) eq true"
	}
});
```