[API](API/index.md) / [Sp](API/index.md#sp) / useRoleDefinitions

### Definition

▸ **useRoleDefinitions**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IRoleDefinitionInfo`[]\>

Returns role definition collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RoleDefinitionsOptions`](useRoleDefinitions.md#roledefinitionsoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useRoleDefinitions will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IRoleDefinitionInfo`[]\>

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