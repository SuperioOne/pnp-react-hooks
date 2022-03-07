---
toc_min_heading_level: 2
toc_max_heading_level: 4
---


## Definition

Returns a file from file collection.

## Overloads

### useFile `IFileInfo`

▸ **useFile**(`fileId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IFileInfo`\>

Returns a file from file collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | File GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FileInfoOptions`](../Interfaces/FileInfoOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFile will resend request when one of the dependencies changed. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`IFileInfo`\>

#### Examples

```typescript
// get file by Id
const fileInfo = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get file by server relative path
const assetInfo = useFile("/sites/mysite/SiteAssets/example.png");
```


------------


### useFile `Blob`

▸ **useFile**(`fileId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`Blob`\>

Returns file content as `Blob`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | File GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FileBlobOptions`](../Interfaces/FileBlobOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFile will resend request when one of the dependencies changed. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`Blob`\>

#### Examples

```typescript
const fileContentAsBlob = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "blob"
});
```


-------


### useFile `ArrayBuffer`

▸ **useFile**(`fileId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ArrayBuffer`\>

Returns file content as {@link ArrayBuffer}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | File GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FileBufferOptions`](../Interfaces/FileBufferOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFile will resend request when one of the dependencies changed. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`ArrayBuffer`\>

#### Examples

```typescript
const fileContentAsBuffer = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "buffer"
});
```


---------


### useFile `string`

▸ **useFile**(`fileId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`string`\>

Returns file content as text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | File GUID Id or server relative path. Changing the value resends request. |
| `options?` | [`FileTextOptions`](../Interfaces/FileTextOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFile will resend request when one of the dependencies changed. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`string`\>

#### Examples

```typescript
const fileContentAsText = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	type: "text"
});
```