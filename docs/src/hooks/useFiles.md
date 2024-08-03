# useFiles

```typescript
useFiles(
	folderId: string,
	options?: FilesOptions,
	deps?: any[]): IFileInfo[] | null | undefined;
```

Returns file collection from folder.

## Examples

Get all files from a folder by UUID,
```typescript
const files = useFiles("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get all files from a folder by server relative URL,
```typescript
const siteAssetsFiles = useFiles("/sites/mysite/SiteAssets", {
	query: {
		select: ["Id", "Name", "ServerRelativeUrl", "Author/Title"]
		expand: ["Author"]
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `folderId` | `string` | Folder UUID or server relative URL | Yes |
| `options?` | `FilesOptions` | useFiles hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

