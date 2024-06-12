import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useListItem**<`T`\>(`itemId`, `list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`\>

Returns an item from specified list item collection.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `number` | Item Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `list` | `string` | List GUID id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ListItemOptions`](../Interfaces/ListItemOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useListItem refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`\>

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
