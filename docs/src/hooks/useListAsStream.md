# useListAsStream

```typescript
useListAsStream(
	list: string,
	parameters: RenderListParameters,
	options?: ListAsStreamOptions,
	deps?: any[]): IRenderListDataAsStreamResult | null | undefined;
```

Returns data for the specified query view.

## Examples

Basic usage
```typescript
const renderData = useListAsStream("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	dataParameters: {
			Paging: "TRUE",
			RenderOptions: RenderListDataOptions.ListData
		},
		dataOverrideParameters: {
			PageFirstRow: "1",
			PageLastRow: "30",
		},
		useQueryParameters: true
	}
);
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `list` | `string` | List UUID or title | Yes |
| `parameters` | `RenderListParameters` | Render parameters | No |
| `options?` | `ListAsStreamOptions` | useListAsStream hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

