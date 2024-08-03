# useListItem

```typescript
useListItem<T>(
	itemId: number,
	list: string,
	options?: listItemOptions,
	deps?: any[]): T | null | undefined;
```

Returns an item from specified list.

## Examples

Get a list item,
```typescript
const item = useListItem(10, "5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get a list item with query and custom type,
```typescript
export interface MyItem {
	Id: number;
	Title: string;
	Created: string;
	Modified: string;
	Author : {
		Title: string;
	}
}

const myItem = useListItem<MyItem>(10, "My List Title", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `itemId` | `number` | Item Id | Yes |
| `list` | `string` | List UUID or title | Yes |
| `options?` | `ListItemOptions` | useListItem hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

