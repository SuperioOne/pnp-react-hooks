import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useList**(`list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IListInfo`\>

Return a list from list collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value repeats request">🚩</ToolTip> |
| `options?` | [`ListOptions`](../Interfaces/ListOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useList will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IListInfo`\>

## Examples

```typescript
// basic usage
const listInfo = useList("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// with query
const myList = useList("My List Title", {
	query: {
		select: ["Title", "Id"],
		filter: "ItemCount eq 0"
	}
});
```