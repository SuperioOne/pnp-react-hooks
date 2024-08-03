# useRoleDefinition

```typescript
useRoleDefinition(
	roleDefId: string | number,
	options?: RoleDefinitionOptions,
	deps?: any[]): IRoleDefinitionInfo | null | undefined;
```

Returns role definition with the specified identifier.

## Examples

Get role definition,
```typescript
const roleDefById = useRoleDefinition(1073741826);

const roleDefByName = useRoleDefinition("Contribute");

const roleDefByKind = useRoleDefinition({
	roleType: RoleTypeKind.EditListItems | RoleTypeKind.ManageLists
});
```

Query role definition properties,
```typescript
const roleDef = useRoleDefinition({ roleType: RoleTypeKind.EditListItems }, {
	query: {
		select: ["Id", "Name", "Description", "Order"]
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `roleDefId` | `string` \| `number` | Role definition name, Id or `RoleTypeKind` | Yes |
| `options?` | `WebAppsOptions` | useRoleDefinition hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |
