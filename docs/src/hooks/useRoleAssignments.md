# useRoleAssignments

```typescript
useRoleAssignments(
	options?: RoleAssignmentsOptions,
	deps?: any[]): IRoleAssignmentInfo[] | null | undefined;
```

Returns role assignmets of selected scope. Use `RoleAssignmentsOptions.scope` property to change scope. Default is current web.

## Examples

Get web role assignments,
```typescript
const webRolesAssignments = useRoleAssignments();
```

Get list role assignments,
```typescript
const myListRoleAssignments = useRoleAssignments({
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
	}
});

const myListRoleAssignments = useRoleAssignments({
	scope: {
		list: "My List Title"
	}
});
```

Get item role assignments,
```typescript
// get list item roles by list title
const listItemRoleAssignments = useRoleAssignments({
	scope: {
		list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7",
		item: 12
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `RoleAssignmentsOptions` | useRoleAssignments hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

