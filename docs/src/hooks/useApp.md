## Definition

▸ **useApp**<`T`\>(`appId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`\>

Returns an app detail of the given Id from the app catalog.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | `string` | App GUID Id string. <ToolTip text="Changing the appId value refreshes response data.">🚩</ToolTip> |
| `options?` | [`WebAppOptions`](../Interfaces/WebAppOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useApp refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`\>

App info object.

## Examples

```typescript
// Get app from site collection app catalog
const app = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// Get app from site collection app catalog with query.
const appWithQuery = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "IsEnabled"]
	}

// Get app from tenant app catalog.
const tenantApp = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
  scope: "tenant"
});

// Set scope to site collection explicitly. Same as `scope: undefined`
const tenantApp = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
  scope: "sitecollection"
});
```
