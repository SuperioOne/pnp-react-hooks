[API](API/index.md) / [Sp](API/index.md#sp) / useList

## Definition

▸ **useList**(`list`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IListInfo`\>

Return a list from list collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. Changing the value resends request. |
| `options?` | [`ListOptions`](API/Interfaces/ListOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useList will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IListInfo`\>

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