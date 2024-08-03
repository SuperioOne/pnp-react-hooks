# useSiteUsers

```typescript
useSiteUsers(
	options?: SiteUsersOptions,
	deps?: any[]): ISiteUserInfo[] | null | undefined;
```

Returns site users.

## Examples

Get all site users,
```typescript
const siteUsers = useSiteUsers();
```

Query site users,
```typescript
const topFiveUser = useSiteUsers({
	query: {
		select: ["Title", "Id", "LoginName"],
		top: 5
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `SiteUsersOptions` | useSiteUsers hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

