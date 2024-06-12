## Definition

▸ **useFiles**(`folderId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IFileInfo`[]\>

Returns file collection from folder.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `folderId` | `string` | Folder GUID Id or server relative path. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`FilesOptions`](../Interfaces/FilesOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFiles refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IFileInfo`[]\>

## Examples

```typescript
// get all files from folder by folder Id
const files = useFiles("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get all files from folder by folder server relative url
const siteAssetsFiles = useFiles("/sites/mysite/SiteAssets", {
	query: {
		select: ["Id", "Name", "ServerRelativeUrl", "Author/Title"]
		expand: ["Author"]
	}
});
```
