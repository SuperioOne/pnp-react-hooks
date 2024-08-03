# useRoleDefinitions

```typescript
useRoleDefinitions(
	options?:RoleDefinitionsOptions,
	deps?: any[]): IRoleDefinitionInfo[] | null | undefined;
```

Returns role definition collection.

## Examples

Get all role definitions,
```typescript
const roleDefByKind = useRoleDefinitions();
```

Query role definitions
```typescript
const filteredroleDef = useRoleDefinitions({
	query: {
		select: ["Id", "Name", "Description", "Order"],
		filter: "Hidden eq false"
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `RoleDefinitionsOptions` | useRoleDefinitions hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

