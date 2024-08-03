# useCurrentUser

```typescript
useCurrentUser(
  options?: CurrentUserInfoOptions, 
  deps?: any[]): ISiteUserInfo | null | undefined;
```

Returns current user information.

## Examples

Get basic user properties,
```typescript
const userAllProps = useCurrentUser();
```

Get user properties with query,
```typescript
const user = useCurrentUser({
  query: {
    select: ["Title", "Id", "LoginName"]
  }
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `CurrentUserInfoOptions` | useCurrentUser hook options. | Partially |
| `deps?` | `DependencyList` | Hook dependency list | Yes |

