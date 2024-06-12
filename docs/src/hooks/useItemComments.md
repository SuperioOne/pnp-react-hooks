import ToolTip from '@site/src/components/tooltip';

### Definition

▸ **useItemComments**(`itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

Returns comment collection of specific list item.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `number` | Item Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ItemCommentsOptions`](../Interfaces/ItemCommentsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useItemComments refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

## Examples

```typescript
// get item comments by list title
const comments = useItemComments(12, "My List Title");

// get item comments by list Id
const comments = useItemComments(12, "5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```