## useListItems

```typescript
useListItems<T>(
	list: string,
	options?: ListItemsOptions,
	deps?: any[]): T[] | null | undefined;

useListItems<T>(
	list: string,
	options?: PagedItemsOptions,
	deps?: any[]): [T[] | null | undefined, nextPageDispatch, boolean];

useListItems<T>(
	list: string,
	options?: AllItemsOptions,
	deps?: any[]): T[] | null | undefined;
```

## Examples

Get list items,
```typescript
const items = useListItems("My List Title");
```

Query list items,
```typescript
const myItems = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	},
	mode: ListItemsMode.Default // 0
});
```

Get list items with custom paging,
```typescript
const [page, nextPage, done] = useListItems("My List Title", {
	mode: ListItemsMode.Paged
});

// You can get next page with nextPageDispatch function.
if(!done) {
	nextPage();

	// Optionally pass a callback function.
	nextPage((data) => console.debug(data));
}
```

Get all items without 5000 item limit (**Not recommended for most cases**),
```typescript
const items = useListItems("My List Title", {
	mode: ListItemsMode.All // 1
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `list` | `string` | List UUID or Title | Yes |
| `options?` | `ListItemsOptions` \| `PagedListItems` \| `AllListItems` | useListItems hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

