
### Definition

▸ **useRoleDefinitions**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRoleDefinitionInfo`[]\>

Returns role definition collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RoleDefinitionsOptions`](../Interfaces/RoleDefinitionsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useRoleDefinitions refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRoleDefinitionInfo`[]\>

## Examples

```typescript
// get all role definitions
const roleDefByKind = useRoleDefinitions();

// get role definitions with query
const filteredroleDef = useRoleDefinitions({
	query: {
		select: ["Id", "Name", "Description", "Order"],
		filter: "Hidden eq false"
	}
});
```