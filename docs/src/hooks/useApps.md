## Definition

▸ **useApps**<`T`\>(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`[]\>

Returns app detail collection from the app catalog.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebAppsOptions`](../Interfaces/WebAppsOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useApps refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`[]\>

App info array.

## Examples

```typescript
// Get apps from site collection app catalog
const apps = useApps();

// Get apps from tenant app catalog
const apps = useApps({
	scope: "tenant"
});

// Set scope to site collection explicitly
const apps = useApps({
	scope: "sitecollection"
});

// Get apps from site collection app catalog with query
const filteredApps = useApps({
	query: {
		select: ["Title", "Id", "IsEnabled"],
		filter: "IsEnabled eq true"
	}
});
```
