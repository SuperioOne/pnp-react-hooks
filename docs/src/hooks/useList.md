# useList

```typescript
useList(
	list: string,
	options?: ListOptions,
	deps?: any[]): IListInfo | null | undefined;
```

Return a list from list collection.

## Examples

Get list info,
```typescript
const listInfo = useList("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Query list properties,
```typescript
const myList = useList("My List Title", {
	query: {
		select: ["Title", "Id"],
		filter: "ItemCount eq 0"
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `list` | `string` | List UUID or title | Yes |
| `options?` | `ListOptions` | useList hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

