
## Definition

▸ **useAttachments**(`itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IAttachmentInfo`[]\>

Returns all attachments of the item.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `number` | List item numeric Id. Changing the value resends request. |
| `list` | `string` | List title or GUID Id string. Changing the value resends request. |
| `options?` | [`ItemAttachmentsOptions`](../Interfaces/ItemAttachmentsOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useAttachments will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IAttachmentInfo`[]\>

array of `IAttachmentInfo`.

## Examples

```typescript
// basic usage
const attachments = useAttachments(10, "My List");

// with query
const filteredAttachments = useAttachments(10, "5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Name", "Id"],
		filter: "substringof('.pdf', Name) eq true"
	}
});
```
