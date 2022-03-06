[API](../index.md) / [Sp](../index.md#sp) / useLists

## Definition

▸ **useLists**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IListInfo`[]\>

Returns list collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ListsOptions`](../Interfaces/ListsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useLists will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IListInfo`[]\>

## Examples

```typescript
// basic usage
const listInfo = useLists();

// with query
const emptyLists = useList({
	query: {
		select: ["Title", "Id"],
		filter: "ItemCount eq 0"
	}
});
```