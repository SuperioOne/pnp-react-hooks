import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useFolderTree**(`rootFolderRelativePath`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<[`TreeContext`](../Interfaces/TreeContext.md)\>

Returns a tree like structure from specified root folder.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rootFolderRelativePath` | `string` | Root folder server relative path. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`FolderTreeOptions`](../Interfaces/FolderTreeOptions.md) | PnP hook paths |
| `deps?` | `DependencyList` | useFolderTree refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<[`TreeContext`](../Interfaces/TreeContext.md)\>

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