[API](API/index.md) / [Sp](API/index.md#sp) / useFolderTree

## Definition

▸ **useFolderTree**(`rootFolderRelativePath`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<[`TreeContext`](TreeContext.md)\>

Returns a tree like structure from specified root folder.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootFolderRelativePath` | `string` | Root folder server relative path |
| `options?` | [`FolderTreeOptions`](FolderTreeOptions.md) | PnP hook paths |
| `deps?` | `DependencyList` | useFolderTree will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<[`TreeContext`](TreeContext.md)\>

## Examples

```typescript
const context = useFolderTree("/sites/mysite/SiteAssets");

const filteredContext = useFolderTree("/sites/mysite/SiteAssets", {
	fileQuery : {
		select: ["Name", "ServerRelativeUrl"]
	},
	folderFilter: "startswith(Name, '_') eq false"
});
```