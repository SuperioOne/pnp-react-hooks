# useFolders

```typescript
useFolders(
	options?: FoldersOptions, 
	deps?: any[]): IFolderInfo[] | null | undefined;
```

Returns folders from root. Use `FoldersOptions.rootFolderId` property to change root folder.

## Examples

Get folders from webs root,
```typescript
const rootFolders = useFolders();
```

Get folders from different folder,
```typescript
const folders = useFolders({
	rootFolderId: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});

const folders = useFolders({
	rootFolderId: "/sites/mysite/SiteAssets"
});
```

Query folders,
```typescript
const filteredFolders = useFolders({
	query:{
		select: ["Id", "Title"],
		filter: "substringof('SiteAssets', Title) eq true"
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `FoldersOptions` | useFolders hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

