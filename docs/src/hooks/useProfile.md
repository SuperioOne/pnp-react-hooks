# useProfiles

```typescript
useProfile<T>(
  loginName: string,
  options?: ProfileOptions,
  deps?: any[]): T | null | undefined;
```

Returns an user profile for specified login name or email.

## Examples

Get profile by user email,
```typescript
const profileByEmail = useProfile("user@example.onmicrosoft.com");
```

Get profile by user login name,
```typescript
const profile = useProfile("i:0#.f|membership|user@example.onmicrosoft.com");
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `loginName` | `string` | User login name or email | Yes |
| `options?` | `ProfileOptions` | useProfile hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

