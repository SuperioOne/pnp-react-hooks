
## Definition

▸ **useRoleDefinition**(`roleDefId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRoleDefinitionInfo`\>

Returns role definition with the specified identifier.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roleDefId` | `string` \| `number` \| [`RoleType`](../Interfaces/RoleType.md) | Role definition name, Id or `RoleTypeKind`. |
| `options?` | [`RoleDefinitionOptions`](../Interfaces/RoleDefinitionOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useRoleDefinition will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRoleDefinitionInfo`\>

## Examples

```typescript
// get role definition by Id
const roleDefById = useRoleDefinition(1073741826);

// get role definition by name
const roleDefByName = useRoleDefinition("Contribute");

// get role definition by RoleTypeKind
const roleDefByKind = useRoleDefinition({
	roleType: RoleTypeKind.EditListItems | RoleTypeKind.ManageLists
});

// get role definition by RoleTypeKind and query
const roleDef = useRoleDefinition({ roleType: RoleTypeKind.EditListItems }, {
	query: {
		select: ["Id", "Name", "Description", "Order"]
	}
});
```
