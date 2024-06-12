## Definition

▸ **useLists**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IListInfo`[]\>

Returns list collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ListsOptions`](../Interfaces/ListsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useLists refreshes response data when one of the dependencies changes. |

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
