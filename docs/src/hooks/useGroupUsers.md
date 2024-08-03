# useGroupUsers

```typescript
useGroupUsers(
	groupId: `string` | `number`,
	options?: GroupUsersOptions,
	deps?: any[]): ISiteUserInfo[] | null | undefined;
```

Returns user collection from specific group.

## Examples

Get group users,
```typescript
const myGroupUsers = useGroupUsers(10);

const myGroupUsers = useGroupUsers("My SharePoint Group");
```

Query group users,
```typescript
const filteredGroupUsers = useGroupUsers("My SharePoint Group", {
	query:{
		select: ["LoginName", "Title"],
		filter: "IsSiteAdmin eq false"
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `groupId` | `string` \| `number` | Group Id or name | Yes |
| `options?` | `GroupUsersOptions` | useGroupUsers hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

