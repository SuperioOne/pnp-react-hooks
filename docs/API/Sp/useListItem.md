[API](API/index.md) / [Sp](API/index.md#sp) / useListItem

## Definition

▸ **useListItem**<`T`\>(`itemId`, `list`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`T`\>

Returns an item from specified list item collection.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `number` | Item Id. Changing the value resends request. |
| `list` | `string` | List GUID id or title. Changing the value resends request. |
| `options?` | [`ListItemOptions`](ListItemOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useListItem will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`T`\>

## Examples

```typescript
// you can provide a type (optional)
export interface MyItem
{
	Id: number;
	Title: string;
	Created: string;
	Modified: string;
	Author : {
		Title: string;
	}
}

// basic usage
const item = useListItem(10, "5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// with query and type information
const myItem = useListItem<MyItem>(10, "My List Title", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	}
});
```
