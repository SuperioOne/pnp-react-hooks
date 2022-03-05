[API](API/index.md) / [Sp](API/index.md#sp) / useLists

## Definition

▸ **useLists**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IListInfo`[]\>

Returns list collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ListsOptions`](useLists.md#listsoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useLists will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IListInfo`[]\>

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