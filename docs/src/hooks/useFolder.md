# useFolder

```typescript
useFolder(
	folderId: string,
	options?: FolderOptions,
	deps?: any[]): IFolderInfo | null | undefined;
```

Return a folder.

## Examples

Get folder by Id,
```typescript
const folder = useFolder("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get folder by server relative url,
```typescript
const siteAssets = useFolder("/sites/mysite/SiteAssets", {
	query: {
		select: ["Id", "Name", "ServerRelativeUrl"]
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `folderId` | `string` | Folder UUID or server relative path | Yes |
| `options?` | `FolderOptions` | useFolder hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

