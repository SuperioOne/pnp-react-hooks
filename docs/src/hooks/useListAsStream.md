import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useListAsStream**(`list`, `parameters`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRenderListDataAsStreamResult`\>

Returns data for the specified query view.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `parameters` | [`RenderListParameters`](../Interfaces/RenderListParameters.md) | Sharepoint RenderAsStream parameters. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ListAsStreamOptions`](../Interfaces/ListAsStreamOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useListAsStream refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRenderListDataAsStreamResult`\>

## Examples

```typescript
// basic usage
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

// all options
const renderData = useListAsStream("My List Title", {
	dataParameters: {
			Paging: "TRUE",
			RenderOptions: RenderListDataOptions.ListData
		},
		dataOverrideParameters: {
			PageFirstRow: "1",
			PageLastRow: "30",
		},
		useQueryParameters: true
	},
	{
		error: (err) => console.error(err),
		sp: mySpContext,
		behaviors: [MyCustomBehavior()]
	},
	[customDependency1, customDependency2]
);
```