[API](API/index.md) / [Sp](API/index.md#sp) / useItemComments

### Definition

▸ **useItemComments**(`itemId`, `list`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ICommentInfo`[]\>

Returns comment collection of specific list item.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `number` | Item Id. Changing the value resends request. |
| `list` | `string` | List GUID Id or title. Changing the value resends request. |
| `options?` | [`ItemCommentsOptions`](ItemCommentsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useItemComments will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ICommentInfo`[]\>

## Examples

```typescript
// get item comments by list title
const comments = useItemComments(12, "My List Title");

// get item comments by list Id
const comments = useItemComments(12, "5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```