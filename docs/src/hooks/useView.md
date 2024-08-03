# useView

```typescript
useView(
	listId: string,
	viewId?: string,
	options?: ViewOptions, 
	deps?: any[]): IViewInfo | null | undefined;
```

Returns a list view.

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `listId?` | `string` | List UUID or title | Yes |
| `viewId?` | `string` | View UUID or title | Yes |
| `options?` | `ViewOptions` | useView hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

## Examples

Get default list view,
```typescript
const defaultView = useView("My List Title");
```

Get list view by name,
```typescript
const myView = useView("My List Title", "My View");
```

Get list view by UUID,
```typescript
const myView = useView("My List Title", "9db07c1f-7880-4601-99d0-1c39c43f6599");
```

Query default list view properties,
```typescript
const defaultViewInfo = useView("My List", undefined, {
	query: {
		select: ["Id"]
	}
});
```
