# useGroups

```typescript
useGroups(options?: GroupsOptions, deps?: any[]): ISiteGroupInfo[] | null | undefined;
```

Returns group collection. Use `GroupsOptions.userId` property to get groups for specific user.

## Examples

Get all groups,
```typescript
const groups = useGroups();
```

Get groups for a specific user,
```typescript
const userGroups = useGroups({
	userId: 20
});

const userGroupsByEmail = useGroups({
	userId: "user@example.onmicrosoft.com"
});

const userGroupsByLoginName = useGroups({
	userId: "i:0#.f|membership|user@example.onmicrosoft.com"
});

```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `GroupsOptions` | useGroups hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

