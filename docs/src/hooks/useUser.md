# useUser

```typescript
useUser(
	userId: string | number,
	options?: UserOptions,
	deps?: any[]): ISiteUserInfo | null | undefined;
```

Returns an user from site user collection.

## Examples

Get site user by Id,
```typescript
const userById = useUser(27);
```
Get site user by email,
```typescript
const userByEmail = useUser("user@example.onmicrosoft.com");
```

Get site user by login name,
```typescript
const userByLoginName = useUser("i:0#.f|membership|user@example.onmicrosoft.com");
```

Query site user properties,
```typescript
const userById = useUser(27, {
	query: {
		select: ["Id", "Title", "LoginName"]
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `user` | `string` \| `number` | User Id, login name or email | Yes |
| `options?` | `UserOptions` | useApps hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

