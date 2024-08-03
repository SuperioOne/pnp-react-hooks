# useLists

```typescript
useLists(options?: ListsOptions, deps?: any[]): IListInfo[] | null | undefined;
```

Returns list collection.

## Examples

Get site lists,
```typescript
const listInfo = useLists();
```

Query site lists,
```typescript
const emptyLists = useList({
	query: {
		select: ["Title", "Id"],
		filter: "ItemCount eq 0"
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `ListsOptions` | useLists hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

