# useFile

```typescript
useFile(
	fileId: string,
	options?: FileInfoOptions,
	deps?: any[]): IFileInfo | null | undefined;

useFile(
	fileId: string,
	options?: FileBlobOptions,
	deps?: any[]): Blob | null | undefined;

useFile(
	fileId: string,
	options?: FileTextOptions,
	deps?: any[]): string | null | undefined;

useFile(
	fileId: string,
	options?: FileBufferOptions,
	deps?: any[]): ArrayBuffer | null | undefined;
```

Returns a file from file collection.

## Examples

Get file info by ID,
```typescript
const fileInfo = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get file info by server relative path,
```typescript
const assetInfo = useFile("/sites/mysite/SiteAssets/example.png");
```

Get file content as `Blob`,
```typescript
const fileContentAsBlob = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "blob"
});
```

Get file content as `ArrayBuffer`,
```typescript
const fileContentAsBuffer = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "buffer"
});
```

Get file content as `string`,
```typescript
const fileContentAsText = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "text"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `fileId` | `string` | file UUID or server relative path | Yes |
| `options?` | `FileInfoOptions` \| `FileBlobOptions` \| `FileTextOptions` \| `FileBufferOptions` | useFile hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

