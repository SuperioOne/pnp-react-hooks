---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import ToolTip from '@site/src/components/tooltip';

## Definition

Returns an attachment from item.

## Overloads

### useAttachment `IAttachmentInfo`

▸ **useAttachment**(`attachmentName`, `itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IAttachmentInfo`\>

Returns an attachment info from item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attachmentName` | `string` | Attachment file name. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `itemId` | `number` | List item numeric Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List title or GUID Id string. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`AttachmentInfoOptions`](../Interfaces/AttachmentInfoOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useAttachment refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`IAttachmentInfo`\>

Attachment info object.

#### Examples

```typescript
// basic usage
const attachmentProps = useAttachment("my-attachment.txt", 12, "My List");

// with query
const appWithQuery = useAttachment("my-attachment.txt", 12, "My List"), {
	query: {
		select: ["Title", "Id"]
	}
});
```


---------


### useAttachment `Blob`

▸ **useAttachment**(`attachmentName`, `itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`Blob`\>

Returns attachment content as `Blob`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attachmentName` | `string` | Attachment file name. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `itemId` | `number` | List item numeric Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List title or GUID Id string. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`AttachmentBlobOptions`](../Interfaces/AttachmentBlobOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useAttachment refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`Blob`\>

Attachment file content.

#### Examples

```typescript
const contentAsBlob = useAttachment("my-attachment.txt", 12, "My List", {
	type: "blob"
});
```


---------


### useAttachment `ArrayBuffer`

▸ **useAttachment**(`attachmentName`, `itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ArrayBuffer`\>

Returns attachment content as `ArrayBuffer`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attachmentName` | `string` | Attachment file name. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `itemId` | `number` | List item numeric Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List title or GUID Id string. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`AttachmentBufferOptions`](../Interfaces/AttachmentBufferOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useAttachment refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`ArrayBuffer`\>

Attachment file content.

#### Examples

```typescript
const contentAsBuffer = useAttachment("my-attachment.txt", 12, "My List", {
	type: "buffer"
});
```


---------


### useAttachment `string`

▸  **useAttachment**(`attachmentName`, `itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`string`\>

Returns attachment content as `string`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attachmentName` | `string` | Attachment file name. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `itemId` | `number` | List item numeric Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List title or GUID Id string. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`AttachmentTextOptions`](../Interfaces/AttachmentTextOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useAttachment refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`string`\>

Attachment file content.

#### Examples

```typescript
const contentAsText = useAttachment("my-attachment.txt", 12, "My List", {
	type: "text"
});
```