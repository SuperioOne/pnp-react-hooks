[API](API/index.md) / [Sp](API/index.md#sp) / useApps

## Definition

▸ **useApps**<`T`\>(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`T`[]\>

Returns app detail collection from the app catalog.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebAppsOptions`](useApps.md#webappsoptions) | PnP hook options |
| `deps?` | `DependencyList` | useApps will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`T`[]\>

App info array.

## Examples

```typescript
// basic usage
const apps = useApps();

// with query
const filteredApps = useApp({
	query: {
		select: ["Title", "Id", "IsEnabled"],
		filter: "IsEnabled eq true"
	}
});
```

