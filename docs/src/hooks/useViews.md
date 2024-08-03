# useViews

```typescript
useViews(
	listId: string,
	options?: ViewsOptions,
	deps?: any[]): IViewInfo[] | null | undefined;
```

Returns list view collection.

## Examples

Get list views,
```typescript
const allViews = useViews("9db07c1f-7880-4601-99d0-1c39c43f6599");
```

Query list views,
```typescript
const viewTitles = useView("My List", {
	query: {
		select: ["Title"],
		top: 5
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `listId` | `string` | List UUID or title | Yes |
| `options?` | `ViewsOptions` | useViews hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

